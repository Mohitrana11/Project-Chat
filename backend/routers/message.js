const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/userAuth");
const { allMessages, sendMessage } = require("../controllers/message");

router.get("/:receiverId", isAuthenticated, allMessages);
router.post("/", isAuthenticated, sendMessage);

module.exports = router;
