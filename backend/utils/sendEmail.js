const User = require("../models/userModels");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorHandler");

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // mailtrap:
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    //nodemailer code
    const emailOption = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset your password",
      text: `Hello! Please ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.`,
      html: `<p>Click <a href='${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}'>
        ${emailType === "VERIFY" ? "Verify your Email" : "Reset your password"}
      </a></p>`,
    };

    const mailResponse = await transport.sendMail(emailOption);
    // console.log("Mail response:", mailResponse);
    return mailResponse;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
};

module.exports = sendEmail;
