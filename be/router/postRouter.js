const express = require("express")
const Router = express.Router();



const {
    fetchPosts,
} = require('../service/postsService')



Router.route("/").get(fetchPosts)


module.exports = Router;