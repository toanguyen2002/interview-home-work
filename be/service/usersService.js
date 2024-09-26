const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const { Users } = require('../model/user')
const asyncHandle = require("express-async-handler")

const fetchUsers = asyncHandle(async (req, res) => {
    const mes = await Users.find()
    res.status(200).send(mes);
})

module.exports = {
    fetchUsers
}
