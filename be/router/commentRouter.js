const express = require("express")
const Router = express.Router();



const {
    fetchCommentByPostId,
} = require('../service/commentsService')


Router.route("/").get(fetchCommentByPostId)


module.exports = Router;