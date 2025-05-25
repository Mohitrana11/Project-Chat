const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getUserDetails,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/user");

const { isAuthenticated } = require("../middlewares/userAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/changepwd", isAuthenticated, requestPasswordReset);
router.post("/resentpwd", isAuthenticated, resetPassword);
router.get("/details/:id", isAuthenticated, getUserDetails);

module.exports = router;
