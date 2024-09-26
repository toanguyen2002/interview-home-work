const express = require("express")
const Router = express.Router();
const { protect } = require("../auth/auth")



const {
    fetchUsers,
    login,
    register,
    update
} = require('../service/usersService')


// Router.route("/").get(protect, fetchUsers)
Router.route("/login").post(login)
Router.route("/register").post(register)
Router.route("/update").post(protect, update)

module.exports = Router;