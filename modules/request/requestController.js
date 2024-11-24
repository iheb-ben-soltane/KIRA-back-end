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
      ;
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
    const sender = req.user.id;

    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      ;
      return next({ messageKey: 'error.invalid_product_id' });
    }

    const existingReceiver = await User.findById(receiver);
    if (!existingReceiver) {
      ;
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