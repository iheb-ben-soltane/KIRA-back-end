const postSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    sellOrRent: { type: String, enum: ['sell', 'rent'], required: true },
    pricePerDay: { type: Number },
    pricePerWeek: { type: Number },
    pricePerMonth: { type: Number },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    isSold: { type: Boolean, default: false },
    reservedDays: [{ type: Date }], // List of reserved days for rental
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;