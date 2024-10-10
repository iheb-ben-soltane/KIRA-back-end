const asyncHandler = require('express-async-handler');
const Operation = require('../models/operationModel');

// Get all operations
const getOperations = asyncHandler(async (req, res) => {
  const operations = await Operation.find({});
  res.json(operations);
});

// Create a new operation
const createOperation = asyncHandler(async (req, res) => {
  const { productId, status } = req.body;
  const operation = new Operation({ productId, userId: req.user._id, status });
  const createdOperation = await operation.save();
  res.status(201).json(createdOperation);
});

module.exports = {
  getOperations,
  createOperation
};