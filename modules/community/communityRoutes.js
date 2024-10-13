const express = require('express');
const { createCommunity, getCommunityById,getCommunities } = require('../community/communityController');
const router = express.Router();
const { verifyToken } = require('../authentication/authMiddleware');

router.post('/communities/create', verifyToken, createCommunity);
router.get('/communities/:id', verifyToken, getCommunityById);
router.get('/communities',getCommunities);

module.exports = router;
