const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    buyerOrRenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user buying or renting
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user selling or renting the product
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // The product involved in the operation
    type: { type: String, enum: ['sell', 'rent'], required: true }, // Operation type (sell or rent)
    totalAmount: { type: Number, required: true }, // Total amount of the transaction
    rentDuration: {
        startDate: { type: Date }, // Start date for rent
        endDate: { type: Date },   // End date for rent
    }, // For rent operations
    createdAt: { type: Date, default: Date.now }, // When the operation was created
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;