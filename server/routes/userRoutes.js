const express = require("express");
const {registerUser, sendVerifyOtp, verifyMail, sendForgetPassOtp, resetPassword, loginUser, fx} = require("../controllers/userController");
const {protect} = require("../middlewares/authToken");


const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/send-mail").post(sendVerifyOtp);
router.route("/verify-mail").post(verifyMail);
router.route("/forget-password").post(sendForgetPassOtp);
router.route("/reset-password").post(resetPassword);
router.route("/random").post(protect,fx);



module.exports = router;