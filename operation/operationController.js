const asyncHandler = require('express-async-handler');
const Operation = require('../operation/operationModel');

// // Get all operations
// const getOperations = asyncHandler(async (req, res) => {
//   const operations = await Operation.find({});
//   res.json(operations);
// });


// Get operation by ID
const getOperationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const operation = await Operation.findById(id);
  if (!operation) {
    return res.status(404).json({ msg: 'Operation not found' });
  }
  res.status(200).json(operation);
});


// Create operation
const createOperation = asyncHandler(async (req, res) => {
  const { owner, buyerOrRenter, product, type, totalAmount, requestedDays } = req.body;
//hedhy tsir fel validators ? 
if (!owner || !buyerOrRenter || !product || !type || !totalAmount) {
  res.status(400);
  throw new Error('All fields are required');
}
  const operation = new Operation({
    owner,
    buyerOrRenter,
    product,
    type,
    totalAmount,
    requestedDays
  });
  
  await operation.save();

  res.status(201).json(operation);
});

module.exports = {
  getOperationById,
  createOperation
};