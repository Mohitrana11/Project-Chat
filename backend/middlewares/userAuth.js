const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModels");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.id) {
    return next(new ErrorHandler("Invalid token", 401));
  }
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    return next(new ErrorHandler("User  not found", 404));
  }
  next();
});

module.exports = {
  isAuthenticated,
};
