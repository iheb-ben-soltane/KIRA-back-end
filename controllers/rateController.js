const asyncHandler = require('express-async-handler');
const Rate = require('../models/rateModel');

// Get all rates
const getRates = asyncHandler(async (req, res) => {
  const rates = await Rate.find({});
  res.json(rates);
});

// Create a new rate
const createRate = asyncHandler(async (req, res) => {
  const { productId, rating, comment, isAboutUser } = req.body;
  const rate = new Rate({
    productId,
    userId: req.user._id,
    rating,
    comment,
    isAboutUser
  });
  const createdRate = await rate.save();
  res.status(201).json(createdRate);
});

module.exports = {
  getRates,
  createRate
};