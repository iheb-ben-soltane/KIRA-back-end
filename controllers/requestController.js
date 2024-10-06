const asyncHandler = require('express-async-handler');
const Request = require('../models/requestModel');

// Get all requests
const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({});
  res.json(requests);
});

// Create a new request
const createRequest = asyncHandler(async (req, res) => {
  const { productId, status } = req.body;
  const request = new Request({ productId, requesterId: req.user._id, status });
  const createdRequest = await request.save();
  res.status(201).json(createdRequest);
});

module.exports = {
  getRequests,
  createRequest
};