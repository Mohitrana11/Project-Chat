const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/userAuth");
const User = require("../models/userModels");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const search = req.query.search ? req.query.search.trim() : "";
    const currentUserId = req.user._id;
    const users = await User.find({
      $and: [
        { username: { $regex: `.*${search}.*`, $options: "i" } },
        { _id: { $ne: currentUserId } },
      ],
    })
      .select("-password")
      .select("-email");
    res.status(200).send({
      success: true,
      users,
      message: "User Found",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
