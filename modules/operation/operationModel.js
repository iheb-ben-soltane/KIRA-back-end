const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user selling or renting the product
    buyerOrRenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user buying or renting
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // The product involved in the operation
    type: { type: String, enum: ['sell', 'rent'], required: true }, // Operation type (sell or rent)
    totalAmount: { type: Number, required: true }, // Total amount of the transaction
    requestedDays: [{ type: Date }],
    createdAt: { type: Date, default: Date.now }, // When the operation was created
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;