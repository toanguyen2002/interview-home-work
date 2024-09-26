const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const { Comments } = require('../model/comment')
const asyncHandle = require("express-async-handler")

const fetchCommentByPostId = asyncHandle(async (req, res) => {
    const mes =
        await Comments.aggregate([
            {
                $match: {

                }
            }
        ])
    res.status(200).send(mes);
})

module.exports = {
    fetchCommentByPostId
}
