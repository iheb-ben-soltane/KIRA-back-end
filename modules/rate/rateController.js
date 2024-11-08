const asyncHandler = require('express-async-handler');
const Rate = require('../rate/rateModel');
const User = require('../user/userModel');
const Product = require('../product/productModel');

// Get all rates
const getRates = asyncHandler(async (req, res, next) => {
  try {
    const rates = await Rate.find({});
    res.json(rates);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get rate by ID
const getRateById = asyncHandler(async (req, res, next) => {
  try {
    const rate = await Rate.findById(req.params.id);
    if (!rate) {
      ;
      return next({ messageKey: 'error.rate_not_found' });
    }
    res.json(rate);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Create a new rate
const createRate = asyncHandler(async (req, res, next) => {
  const { content, stars, targetUser, targetProduct } = req.body;

  try {
    // Check if the target product exists
    if (targetProduct) {
      const existingProduct = await Product.findById(targetProduct);
      if (!existingProduct) {
        ;
        return next({ messageKey: 'error.invalid_product_id' });
      }
    }

    // Check if the target user exists
    if (targetUser) {
      const existingUser = await User.findById(targetUser);
      if (!existingUser) {
        ;
        return next({ messageKey: 'error.invalid_user_id' });
      }
    }

    // Assign the writer ID from the JWT token
    const writer = req.user.id;

    const rate = new Rate({ writer, content, stars, targetUser, targetProduct });
    await rate.save();

    res.status(201).json(rate);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

module.exports = {
  getRates,
  createRate,
  getRateById
};