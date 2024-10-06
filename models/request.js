const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User making the request
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Product in question
    type: { type: String, enum: ['sell', 'rent'], required: true }, // Type of request (sell or rent)
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Request status
    requestedDays: [{ type: Date }], // For rental, the days requested for reservation
    createdAt: { type: Date, default: Date.now }, // When the request was made
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;