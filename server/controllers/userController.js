const userCollectionModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const { mailer } = require("../utils/nodemailer");
const { verifyPassword } = require("../utils/matchPassword");
const {generateToken} = require("../utils/generateJwt");
const {checkSchema} = require('express-validator');

const registrationSchema = {
    userName: {
        notEmpty: true,
        custom: {
            options: (value, { req }) => {
                return userCollectionModel
                    .findOne({
                        userName: value,
                    })
                    .then((user) => {
                        if (user) {
                            return Promise.reject("Username already in use");
                        }
                    });
            },
        },
        errorMessage: "UserName cannot be empty",
    },
    name: {
        notEmpty: true,
        errorMessage: "Name cannot be empty",
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
        },
        errorMessage:
            "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    email: {
        notEmpty: true,
        normalizeEmail: true,
        custom: {
            options: (value, { req }) => {
                return userCollectionModel
                    .findOne({
                        email: value,
                    })
                    .then((user) => {
                        if (user) {
                            return Promise.reject("Email address already taken");
                        }
                    });
            },
        },
        errorMessage: "email cannot be empty",
    },
};

// register new user after the validation check require {name,email,password,username}
const registerUser = [
    checkSchema(registrationSchema),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        let user = new userCollectionModel(req.body);
        user = await user.save();
        user = {
            ...user._doc,
            token:`Bearer ${generateToken(user._id)}`
        }
        return res.send({
            err: false,
            result: user,
        });
    } catch (error) {
        return res.send({
            err: true,
            sysError: error,
        });
    }
}]

// this api is to be run after saving the user to verify their mail require {userId}
const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        let user = await userCollectionModel.findByIdAndUpdate(
            userId,
            {
                otp,
            },
            { new: true }
        );
        user = await user.save();
        mailer(user.email, "Please verify your email", otp);
        return res.send({
            err: false,
            result: user,
        });
    } catch (error) {
        return res.send({
            err: true,
            sysError: error,
        });
    }
};

//to verify the sent otp for mail verification require {userId,otp}
const verifyMail = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        let user = await userCollectionModel.findById(userId);
        if (otp === user.otp) {
            user.otp = null;
            user.isVerified = true;
            user = await user.save();
            return res.send({
                err: false,
                result: user,
            });
        } else {
            return res.send({
                err: true,
                msg: "Wrong One time password",
            });
        }
    } catch (error) {
        return res.send({
            err: true,
            sysError: error,
        });
    }
};

//api to sent otp through mail in case of forget passowrd require {email}
const sendForgetPassOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        let user = await userCollectionModel.findOne({ email });
        if (!user) {
            return res.send({
                err: true,
                msg: "This email is not registered with us",
            });
        }
        if (!user.isVerified) {
            return res.send({
                err: true,
                msg: "Sorry but your email is not verified",
            });
        }
        if (user && user.isVerified) {
            user.otp = otp;
            user = await user.save();
            mailer(
                user.email,
                "Please use the following otp for password resetting",
                otp
            );
            return res.send({
                err: false,
                result: user,
            });
        }
    } catch (error) {
        return res.send({
            err: true,
            sysError: error,
        });
    }
};

//api to verify otp for forgot password and reset password require {userId,otp,newPassword}
const resetPassword = async (req, res) => {
    try {
        const { userId, otp, newPassword } = req.body;
        if (!userId || !otp || !newPassword) {
            return res.send({
                err: true,
                msg: "userId, otp, password these fields can not be empty",
            });
        }
        let user = await userCollectionModel.findById(userId);
        if (!user) {
            return res.send({
                err: true,
                msg: "User not found",
            });
        }
        if (user.otp === otp) {
            user.otp = null;
            user.password = newPassword;
            user = await user.save();
            return res.send({
                err: false,
                result: user,
            });
        } else {
            return res.send({
                err: true,
                msg: "Invalid One time password",
            });
        }
    } catch (error) {
        return res.send({
            err: true,
            sysError: error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send({
                err: true,
                msg: "email and password cannot be empty",
            });
        }
        let user = await userCollectionModel.findOne({ email });
        if (!user) {
            return res.send({
                err: true,
                msg: "No such user found",
            });
        }
        let verification =await verifyPassword(password, user.password);
        if (verification === true) {
            user = {
                ...user._doc,
                token:`Bearer ${generateToken(user._id)}`
            }
            return res.send({
                err: false,
                result: user,
            });
        } else {
            return res.send({
                err: true,
                msg: "Invalid password",
            });
        }
    } catch (error) {
        return res.send({
            err: true,
            sysError: error,
        });
    }
};


const fx = (req,res)=>{
    res.send(req.user);
}

module.exports = {
    registerUser,
    sendVerifyOtp,
    verifyMail,
    sendForgetPassOtp,
    resetPassword,
    loginUser,
    fx
};
