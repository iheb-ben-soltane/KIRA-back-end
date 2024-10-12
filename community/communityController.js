const asyncHandler = require('express-async-handler');
const Community = require('../community/communityModel');

// Get all communities
const getCommunities = asyncHandler(async (req, res) => {
  const communities = await Community.find({});
  res.json(communities);
});

// Get Community by ID
const getCommunityById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const community = await Community.findById(id);
  if (!community) {
    return res.status(404).json({ msg: 'Community not found' });
  }
  res.status(200).json(community);
});


// Create community
const createCommunity = asyncHandler(async (req, res) => {
  const {name, isPublic,} = req.body;
  // get the creator ID from the JWT token to assign it to the members and admins
  creator = req.user.id;
  const community = new Community({
    name,
    isPublic,
    admins: [creator], 
    members: [creator], 
  });

  await community.save();

  res.status(201).json(community);

});

module.exports = {
  getCommunities,
  createCommunity,
  getCommunityById
};