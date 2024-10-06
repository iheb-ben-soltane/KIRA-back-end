const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');

// Get all chats
const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({});
  res.json(chats);
});

// Create a new chat message
const createChatMessage = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;
  const chat = new Chat({
    senderId: req.user._id,
    receiverId,
    message
  });
  const createdChatMessage = await chat.save();
  res.status(201).json(createdChatMessage);
});

module.exports = {
  getChats,
  createChatMessage
};