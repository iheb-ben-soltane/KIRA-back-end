const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    description: { type: String },
    subCategory: { type: String },
    sellOrRent: { type: String, enum: ['sell', 'rent'], required: true },
    price: { type: Number },
    pricePerDay: { type: Number },
    pricePerWeek: { type: Number },
    pricePerMonth: { type: Number },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    isSold: { type: Boolean, default: false },
    reservedDays: [{ type: Date }], // List of reserved days for rental
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;