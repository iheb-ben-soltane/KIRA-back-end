const express = require('express');
const { getChats, createChatMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getChats).post(protect, createChatMessage); // Get all chats, send chat message

module.exports = router;