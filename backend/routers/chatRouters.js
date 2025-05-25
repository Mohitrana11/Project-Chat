const express = require("express");
const router = express.Router();

const {
  renameGroup,
  accessChat,
  fetchChats,
  fetchGroups,
  createGroup,
  groupExit,
  addSelfToGroup,
} = require("../controllers/chatWith");

const { isAuthenticated } = require("../middlewares/userAuth");

router.post("/", isAuthenticated, accessChat);
router.get("/", isAuthenticated, fetchChats);
router.post("/createGroup", isAuthenticated, createGroup);
router.post("/rename", isAuthenticated, renameGroup);
router.get("/fetchGroups", isAuthenticated, fetchGroups);
router.put("/exitGroups", isAuthenticated, groupExit);
router.put("/addSelfToGroup", isAuthenticated, addSelfToGroup);

module.exports = router;
