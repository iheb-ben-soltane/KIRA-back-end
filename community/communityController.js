const asyncHandler = require('express-async-handler');
const Community = require('../models/communityModel');

// Get all communities
const getCommunities = asyncHandler(async (req, res) => {
  const communities = await Community.find({});
  res.json(communities);
});

// Create a new community
const createCommunity = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const community = new Community({ name, description, ownerId: req.user._id });
  const createdCommunity = await community.save();
  res.status(201).json(createdCommunity);
});

module.exports = {
  getCommunities,
  createCommunity
};