const asyncHandler = require('express-async-handler');
const Request = require('../request/requestModel');
const Product = require('../product/productModel');
const User = require('../user/userModel');

// Get request by ID
const getRequestById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    if (!request) {
      res.status(404);
      return next({ messageKey: 'error.request_not_found' });
    }
    res.status(200).json(request);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Create request
const createRequest = asyncHandler(async (req, res, next) => {
  const { receiver, product, type, requestedDays } = req.body;

  try {
    // Assign the sender ID from the JWT token
    const sender = req.user.id;

    // Check if the product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      res.status(400);
      return next({ messageKey: 'error.invalid_product_id' });
    }

    // Check if the receiver exists
    const existingReceiver = await User.findById(receiver);
    if (!existingReceiver) {
      res.status(400);
      return next({ messageKey: 'error.invalid_receiver_id' });
    }

    const request = new Request({
      sender,
      receiver,
      product,
      type,
      requestedDays,
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

module.exports = {
  createRequest,
  getRequestById
};