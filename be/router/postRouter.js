const express = require("express")
const Router = express.Router();
const { protect } = require("../auth/auth")



const {
    fetchPosts,
    addPost,
    updatePost,
    removePost,
} = require('../service/postsService')

const {
    fetchCommentByPostId,
} = require('../service/commentsService')



Router.route("/").get(fetchPosts)
Router.route("/add").post(protect, addPost)
Router.route("/update").post(protect, updatePost)
Router.route("/remove/:idPost").get(protect, removePost)
// Router.route("/delete/:id").post(removePost)
Router.route("/:postId/comments").get(fetchCommentByPostId)

module.exports = Router;