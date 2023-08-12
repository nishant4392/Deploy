const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const mailer = async (to, subject, otp) => {
try {
  const info = await transporter.sendMail({
    from: `"React deploy 👻" <${process.env.EMAIL}>`,
    to: `${to}`,
    subject: `${subject}`,
    text: `Following is your otp ${otp}`,
  });
  return info;
} catch (error) {
  return error;
}
};

module.exports = { mailer };
