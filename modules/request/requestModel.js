const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    receiver:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['sell', 'rent'], required: true }, 
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Request status
    requestedDays: [{ type: Date }], // For rental, the days requested for reservation
    createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;