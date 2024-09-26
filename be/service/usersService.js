const mongodb = require('mongodb');
const { default: mongoose } = require("mongoose");
const { Users } = require('../model/user')
const asyncHandle = require("express-async-handler");
const { genToken } = require('../auth/auth');

const fetchUsers = asyncHandle(async (req, res) => {
    const mes = await Users.find()
    res.status(200).send(mes);
})

const login = asyncHandle(async (req, res) => {
    const { username, password } = req.body
    const users = await Users.aggregate([
        { $match: { username: username } }
    ])
    if (users.length > 0) {
        if (users[0].password == password) {
            const token = genToken(users[0]._id)
            const { password, ...payload } = users[0]
            res.status(200).send({ ...payload, token: token })
        } else {
            res.status(401).send("Un auth")
        }
    } else {
        res.status(401).send("Un auth")
    }
})

const update = asyncHandle(async (req, res) => {
    const { username, password, name } = req.body
    const users = await Users.aggregate([
        { $match: { username: username } }
    ])
    if (users.length > 0) {
        const newUpdate = await Users.findByIdAndUpdate(users[0]._id,
            {
                password: req.body.password,
                name: req.body.name
            }, { new: true })
        res.status(200).send(newUpdate)
    } else {
        res.status(401).send("Un auth")
    }
})

const register = asyncHandle(async (req, res) => {
    const { username } = req.body
    const firstpassWord = req.body.password
    const users = await Users.aggregate([
        { $match: { username: username } }
    ])
    if (users.length > 0) {
        res.status(200).send("user exits")
    } else {
        const user = await new Users({
            username: username,
            password: firstpassWord,
            name: "",
            dob: ""
        }).save()
        const token = genToken(user._doc._id)
        const { password, ...payload } = user._doc
        res.status(200).send({ ...payload, token: token })
    }
})

module.exports = {
    fetchUsers,
    login,
    register,
    update
}
