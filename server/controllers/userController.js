const userCollectionModel = require("../models/userModel");
const { validationResult, checkSchema } = require("express-validator");
const { mailer } = require("../utils/nodemailer");
const { verifyPassword } = require("../utils/matchPassword");
const { generateToken } = require("../utils/generateJwt");
const { responses } = require("../utils/responses");

const registrationSchema = {
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
};

// register new user after the validation check require {name,email,password,username}
const registerUser = [
  checkSchema(registrationSchema),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({
           err:true,
           ...errors.array()[0]
        });
      }
      let user = new userCollectionModel(req.body);
      user = await user.save();
      user = {
        ...user._doc,
        token: `Bearer ${generateToken(user._id)}`,
      };
      return responses.success(res, user, "Successfully registered");
    } catch (error) {
      return responses.systemError(res, error);
    }
  },
];

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return responses.error(res, "email and password cannot be empty");
    }
    let user = await userCollectionModel.findOne({ email });
    if (!user) {
      return responses.error(res, "No such user found");
    }
    let verification = await verifyPassword(password, user.password);
    if (verification === true) {
      user = {
        ...user._doc,
        token: `Bearer ${generateToken(user._id)}`,
      };
      return responses.success(res, user, "Login successfull");
    } else {
      return responses.error(res, "Invalid password");
    }
  } catch (error) {
    return responses.systemError(res, error);
  }
};

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
    let info = await mailer(user.email, "Please verify your email", otp);
    if (info && info.messageId) {
      return responses.success(res, user, "Email has been sent successfully.");
    } else {
      return responses.error(res, "Email not sent.");
    }
  } catch (error) {
    return responses.systemError(res, error);
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
      return responses.success(res, user, "Email verification successfull");
    } else {
      return responses.error(res, "Wrong One time password");
    }
  } catch (error) {
    return responses.systemError(res, error);
  }
};

//api to sent otp through mail in case of forget passowrd require {email}
const sendForgetPassOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    let user = await userCollectionModel.findOne({ email });
    if (!user) {
      return responses.error(res, "This email is not registered with us");
    }
    if (!user.isVerified) {
      return responses.error(res, "Sorry but your email is not verified");
    }
    if (user && user.isVerified) {
      user.otp = otp;
      user = await user.save();
      let info = await mailer(
        user.email,
        "Please use the following otp for password resetting",
        otp
      );
      if (info && info.messageId) {
        return responses.success(res, user, "Email has been sent successfully");
      } else {
        return responses.error(res, "Email not sent.");
      }
    }
  } catch (error) {
    return responses.systemError(res, error);
  }
};

//api to verify otp for forgot password and reset password require {userId,otp,newPassword}
const resetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;
    if (!userId || !otp || !newPassword) {
      return responses.error(
        res,
        "userId, otp, password these fields can not be empty"
      );
    }
    let user = await userCollectionModel.findById(userId);
    if (!user) {
      return responses.error(res, "User not found");
    }
    if (user.otp === otp) {
      user.otp = null;
      user.password = newPassword;
      user = await user.save();
      return responses.success(
        res,
        user,
        "Password has been changed successfully"
      );
    } else {
      return responses.error(res, "Invalid One time password");
    }
  } catch (error) {
    return responses.systemError(res, error);
  }
};

const fx = (req, res) => {
  res.send(req.user);
};

module.exports = {
  registerUser,
  registrationSchema,
  sendVerifyOtp,
  verifyMail,
  sendForgetPassOtp,
  resetPassword,
  loginUser,
  fx,
};
