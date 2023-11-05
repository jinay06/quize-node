const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
var cookieParser = require("cookie-parser");
require("./config/db.js");


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    next();
});

var corsOptions = {
    origin: process.env.origin,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

require("./routes/auth.route.js")(app);
require("./routes/questions.route.js")(app);

app.listen(3030, () => {
    console.log(`Server is running.`);
});