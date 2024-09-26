const express = require("express")
const Router = express.Router();



const {
    add,
    addComment,
    removeComment,
    updateComment,
} = require('../service/commentsService');
const { protect } = require("../auth/auth");


Router.route("/add").post(protect, addComment)
Router.route("/update").post(protect, updateComment)
Router.route("/remove/:commentId").get(protect, removeComment)


module.exports = Router;