const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the subcategory
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to the parent category
    description: { type: String }, // Optional description of the subcategory
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;