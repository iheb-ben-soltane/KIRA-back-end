const express = require('express');
const { getCommunities, createCommunity } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getCommunities).post(protect, createCommunity); // Get all communities, create community

module.exports = router;