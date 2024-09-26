const jwt = require("jsonwebtoken")
const { Users } = require("../model/user")
const asyncHandle = require("express-async-handler");
const JWT_SECRET = "1231131231231242134234234234234234234233242342342342342342311223123123123123123234"
const genToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1d",

    })
}
const protect = asyncHandle(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, JWT_SECRET)
            console.log(decoded);
            req.users = await Users.findById(decoded.id)
            // console.log(await Users.findById(decoded.id));
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized");
    }
})

module.exports = {
    protect,
    genToken
}