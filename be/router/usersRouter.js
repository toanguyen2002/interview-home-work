const express = require("express")
const Router = express.Router();



const {
    fetchUsers,
} = require('../service/usersService')



Router.route("/").get(fetchUsers)


module.exports = Router;