const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    description: { type: String },
    sellOrRent: { type: String, enum: ['sell', 'rent'], required: true },
    price: { type: Number },
    isSold: { type: Boolean, default: false },
    reservedDays: [{ type: Date }], // List of reserved days for rental
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;