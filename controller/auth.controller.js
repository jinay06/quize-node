const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.Create_user = async (req, res) => {
    try {
        const email = req.body.email;
        console.log('email :', email);

        const dubEmail = await User.findOne({ email: email });

        if (dubEmail) {
            console.log('dubEmail :', dubEmail);
            return res.send("Email Exists");
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            var user = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                mobile: req.body.mobile,
                email: req.body.email,
                password: hashedPassword,
            });

            console.log("user", user);
            const data = await user.save();
            if (!data) {
                return res.status(500).send("Error occurred");
            } else {
                return res.status(200).send({
                    data: {
                        id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        mobile: user.mobile,
                        email: user.email,
                        city: user.city,
                        stat: user.stat,
                        postalcode: user.postalcode,
                        country: user.country,
                    },
                    message: "User was registered successfully!",
                });
            }
        }
    } catch (error) {
        return res.status(500).send({ error, message: "An error occurred" });
    }
}

exports.SigninUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found. Please try again.");
        }

        const passwordIsValid = await bcrypt.compareSync(password, user.password);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRECTKEY, {
            expiresIn: '1d',
        })
        if (passwordIsValid) {
            res.send({ message: "Login Successfully", user: user, token });
        } else {
            return res.send("Invalid Password");
        }

    } catch (error) {
        res.status(500).send({ error, message: "An error occurred" });
    }
}





