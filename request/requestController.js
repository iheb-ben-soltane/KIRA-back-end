const asyncHandler = require('express-async-handler');
const Request = require('../request/requestModel');
const Product = require('../product/productModel');
const User = require('../user/userModel');

// Create request
const createRequest = asyncHandler(async (req, res) => {
  const { receiver, product, type, requestedDays } = req.body;

  // Assign the sender ID from the JWT token
  sender = req.user.id;
  const existingProduct = await Product.findById(product);
  if (!existingProduct) {
    return res.status(400).json({ msg: 'Invalid product ID' });
  }
  const existingReceiver = await User.findById(receiver);
  if (!existingReceiver) {
    return res.status(400).json({ msg: 'Invalid receiver ID' });
  }
  // !!!!!!!!!!
  //behy houni mazelt n5amem est ce que l id mtee product w receiver ye5ouhom mel url wala ml body 5ir
  // wala alakal mtee receiver
  const request = new Request({
    sender,
    receiver,
    product,
    type,
    requestedDays,
  });

  await request.save();
  res.status(201).json(request);
});

// Get request by ID
const getRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const request = await Request.findById(id);
  if (!request) {
    return res.status(404).json({ msg: 'Request not found' });
  }
  res.status(200).json(request);
});


module.exports = {
  createRequest,
  getRequestById
};