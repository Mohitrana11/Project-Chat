const Message = require("../models/message");
const Conversation = require("../models/conversation");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const redis = require("../utils/redisClient");

// [Send a message]-----------------------------------------
const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { message, receiverId } = req.body;
  const senderId = req.user._id;

  if (!message) {
    return next(new ErrorHandler("Message content is required", 400));
  }

  await redis.del(`userChats:${receiverId}`);
  await redis.del(`messages:${senderId}:${receiverId}`);

  let conversation = await Conversation.findOne({
    users: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    // If no conversation exists, create a new one
    conversation = await Conversation.create({
      users: [senderId, receiverId],
    });
  }

  // Create a new message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
    conversationId: conversation._id,
  });

  // Update the conversation with the latest message
  conversation.latestMessage = newMessage._id;
  await conversation.save();

  res.status(201).json(newMessage);
});

// [Fetch all messages in a conversation]--------------------
const allMessages = catchAsyncErrors(async (req, res, next) => {
  const { receiverId } = req.params;
  const senderId = req.user._id;

  const cacheKey = `messages:${senderId}:${receiverId}`;

  const cachedMessages = await redis.get(cacheKey);
  if (cachedMessages) {
    return res.status(200).json(JSON.parse(cachedMessages));
  }
  let conversation = await Conversation.findOne({
    users: { $all: [senderId, receiverId] },
  }).populate("latestMessage");

  if (!conversation) {
    return res.status(200).json([]);
  }
  const messages = await Message.find({ conversationId: conversation._id });
  await redis.set(cacheKey, JSON.stringify(messages), "EX", 60 * 2);
  res.status(200).json(messages);
});

module.exports = {
  allMessages,
  sendMessage,
};
