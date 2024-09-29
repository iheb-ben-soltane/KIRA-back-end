const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    description: { type: String },
    category: { type: String },
    subCategory: { type: String },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;