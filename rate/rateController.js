const asyncHandler = require('express-async-handler');
const Rate = require('../rate/rateModel');
const User = require('../user/userModel');
const Product = require('../product/productModel');

// Get all rates
const getRates = asyncHandler(async (req, res) => {
  const rates = await Rate.find({});
  res.json(rates);
});

// Get rate by ID
const getRateById = asyncHandler(async (req, res) => {
  const rate = await Rate.findById(req.params.id);
  if (rate) {
    res.json(rate);
  } else {
    res.status(404);
    throw new Error('Rate not found');
  }
});

// Create a new rate
const createRate = asyncHandler(async (req, res) => {
  const { content,stars,targetUser,targetProduct } = req.body;

  // Check if the target product exists
  if(targetProduct){
    const existingProduct = await Product.findById(targetProduct);
    if (!existingProduct) {
      return res.status(400).json({ msg: 'Invalid product ID' });
    }
  }
  // Check if the target user exists
  if(targetUser){
    const existingUser = await User.findById(targetUser);
    if (!existingUser) {
      return res.status(400).json({ msg: 'Invalid target user ID' });
    }
  }
  // Assign the writer ID from the JWT token
    const writer = req.user.id;

    const rate = new Rate({ writer, content, stars, targetUser, targetProduct });
    await rate.save();
    
    res.status(201).json(rate);
});

module.exports = {
  getRates,
  createRate,
  getRateById
};