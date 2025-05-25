const User = require("../models/userModels");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { cookieOption } = require("../constants/options");
const sendEmail = require("../utils/sendEmail");

// [Register User] -----------------------------------------
const register = catchAsyncErrors(async (req, res, next) => {
  const { email, username, password, avatar } = req.body;

  if (!email || !username || !password) {
    return next(new ErrorHandler("Please Provide you details", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("User aleady exist!", 400));
  }
  const profilePicBoy =
    avatar || `https://avatar.iran.liara.run/public/boy/?username${username}`;
  const user = await User.create({
    email,
    username,
    password,
    avatar: profilePicBoy,
  });
  await sendEmail({ email, emailType: "VERIFY", userId: user._id });

  const token = user.getJWTToken();
  res.status(201).cookie("token", token, cookieOption).json({
    success: true,
    message: "Sign in Successful",
    user,
    token,
  });
});

// [Login User] -----------------------------------------
const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("User Email and password required! ", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email not found!", 400));
  }
  const passwords = await user.comparePassword(password);
  if (!passwords) {
    return next(new ErrorHandler("Wrong Password... ", 404));
  }
  const token = user.getJWTToken();
  res.cookie("token", token);
  const users = await User.findOne({ email }).select("-password");
  res.status(200).cookie("token", token, cookieOption).json({
    success: true,
    message: "Login in Successful",
    users,
    token,
  });
});

// [Logout User] -----------------------------------------
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logout  Successfully",
  });
});

// [Get User Details]---------------------------------------
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const details = await User.findById(id);
  res.status(200).json({
    success: true,
    details,
    message: "Your Details",
  });
});

// [Get User All Details]---------------------------------------
const usersDetails = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({
    _id: { $ne: req.user._id },
  });
  res.status(200).json({
    success: true,
    users,
    message: "All user details",
  });
});

// [Reset Password]---------------------------------------
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired token", 400));
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully!",
  });
});

// [Request Password Reset]---------------------------------------
const requestPasswordReset = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  await sendEmail({ email, emailType: "RESET", userId: user._id });
  res.status(200).json({
    success: true,
    message: "Password reset email sent!",
  });
});

module.exports = {
  register,
  login,
  logout,
  getUserDetails,
  requestPasswordReset,
  resetPassword,
  usersDetails,
};
