const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        fname: String,
        lname: String,
        mobile: String,
        email: String,
        password: String,
    })
);

module.exports = User;
