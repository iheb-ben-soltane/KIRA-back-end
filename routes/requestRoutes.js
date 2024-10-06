const express = require('express');
const { getRequests, createRequest } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getRequests).post(protect, createRequest); // Get all requests, create request

module.exports = router;