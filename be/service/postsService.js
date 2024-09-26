const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const { Posts } = require('../model/post')
const asyncHandle = require("express-async-handler")

const fetchPosts = asyncHandle(async (req, res) => {
    const mes = await Posts.find()
    res.status(200).send(mes);
})

const addPost = asyncHandle(async (req, res) => {
    const post = await new Posts({
        content: req.body?.content,
        title: req.body?.title,
        owner: req.users?._id,
        tags: req.body?.tags
    }).save()
    res.status(200).send(post);
})

const updatePost = asyncHandle(async (req, res) => {
    const post = await Posts.findByIdAndUpdate(req.body.id, {
        content: req.body.content,
        title: req.body.title,
        tags: req.body.tags
    }, { new: true })
    res.status(200).send(post);
})

const removePost = asyncHandle(async (req, res) => {
    const post = await Posts.findByIdAndDelete(req.params.idPost)
    res.status(200).send(post);
})

module.exports = {
    fetchPosts,
    addPost,
    updatePost,
    removePost,
}
