const express = require("express");
const {registerUser,registrationSchema, sendVerifyOtp, verifyMail, sendForgetPassOtp, resetPassword, loginUser, fx} = require("../controllers/userController");
const {checkSchema} = require('express-validator');
const {protect} = require("../middlewares/authToken");


const router = express.Router();

router.route("/register").post(checkSchema(registrationSchema),registerUser);
router.route("/login").post(loginUser);
router.route("/send-mail").post(sendVerifyOtp);
router.route("/verify-mail").post(verifyMail);
router.route("/forget-password").post(sendForgetPassOtp);
router.route("/reset-password").post(resetPassword);
router.route("/random").post(protect,fx);



module.exports = router;