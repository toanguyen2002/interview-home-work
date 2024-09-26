const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const { Posts } = require('../model/post')
const asyncHandle = require("express-async-handler")

const fetchPosts = asyncHandle(async (req, res) => {
    const mes = await Posts.find()
    res.status(200).send(mes);
})

module.exports = {
    fetchPosts
}
