const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const { Comments } = require('../model/comment')
const { Posts } = require('../model/post')
const asyncHandle = require("express-async-handler")

const fetchCommentByPostId = asyncHandle(async (req, res) => {
    const mes =
        await Comments.aggregate([
            {
                $match: {
                    post: new mongoose.Types.ObjectId(req.params.postId)
                }
            }
        ])
    if (mes.length > 0) {
        res.status(200).send(mes);
    } else {
        res.status(200).send([])
    }
})

const addComment = asyncHandle(async (req, res) => {
    const comment = await new Comments(
        {
            owner: req.users._id,
            post: req.body.post,
            content: req.body.content
        }
    ).save()
    res.status(200).send(comment)
})

const updateComment = asyncHandle(async (req, res) => {
    const currentComment = await Comments.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.body.id) } }
    ])
    if (currentComment.length > 0) {
        if (currentComment[0].owner.toString() === req.users._id.toString()) {
            const commentAfterUpdate = await Comments.findByIdAndUpdate(currentComment[0]._id, {
                content: req.body.content
            }, { new: true })
            res.status(200).send(commentAfterUpdate)
        }
    } else {
        res.status(500).send("wrong")
    }
})

const removeComment = asyncHandle(async (req, res) => {
    const currentComment = await Comments.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.commentId) } },
        {
            $lookup: {
                from: "posts",
                localField: "post",
                foreignField: "_id",
                as: "post"
            }
        },
        {
            $unwind: "$post"
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        {
                            commentContent: "$content",
                            commentowner: "$owner"
                        },
                        "$post"
                    ]
                }
            }
        },
    ])
    if (currentComment.length > 0) {
        if (currentComment[0].commentowner.toString() === req.users._id.toString() || currentComment[0].owner.toString() == req.users._id.toString()) {
            const comment = await Comments.findByIdAndDelete(req.params.commentId)
            res.status(200).send(currentComment)
        }
    } else {
        res.status(500).send("not exist")
    }

})

module.exports = {
    fetchCommentByPostId,
    addComment,
    updateComment,
    removeComment,
}
