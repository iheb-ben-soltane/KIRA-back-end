const asyncHandler = require('express-async-handler');
const Community = require('../community/communityModel');

// Get all communities
const getCommunities = asyncHandler(async (req, res, next) => {
  try {
    const communities = await Community.find({});
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get Community by ID
const getCommunityById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const community = await Community.findById(id);
    if (!community) {
      ;
      return next({ messageKey: 'error.community_not_found' });
    }
    res.status(200).json(community);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Create community
const createCommunity = asyncHandler(async (req, res, next) => {
  const { name, isPublic } = req.body;
  try {
    const creator = req.user.id;
    const community = new Community({
      name,
      isPublic,
      admins: [creator], 
      members: [creator], 
    });

    await community.save();
    res.status(201).json(community);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

module.exports = {
  getCommunities,
  createCommunity,
  getCommunityById
};