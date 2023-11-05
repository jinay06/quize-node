const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.isAuth = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            const Token = req.headers.authorization
            console.log('Token :', Token);
            const decode = jwt.verify(Token, process.env.JWT_SECRECTKEY);

            const user = await User.findById(decode.userId)

            if (!user) {
                return res.status(500).send({ message: "unauthrization access" })
            }
            req.user = user
            next();
        }
    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            res.status(500).send({ message: "unauthrization access" })
        }
        if (error.name == "TokenExpiredError") {
            res.status(500).send({ message: "sesson Expired" })
        }
        res.send("Error")
    }
}