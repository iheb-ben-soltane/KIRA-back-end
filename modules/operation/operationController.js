const asyncHandler = require('express-async-handler');
const Operation = require('../operation/operationModel');

// Get operation by ID
const getOperationById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const operation = await Operation.findById(id);
    if (!operation) {
      ;
      return next({ messageKey: 'error.operation_not_found' });
    }
    res.status(200).json(operation);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Create operation
const createOperation = asyncHandler(async (req, res, next) => {
  const { owner, buyerOrRenter, product, type, totalAmount, requestedDays } = req.body;

  if (!owner || !buyerOrRenter || !product || !type || !totalAmount) {
    ;
    return next({ messageKey: 'error.fields_required' });
  }

  try {
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
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

module.exports = {
  getOperationById,
  createOperation
};