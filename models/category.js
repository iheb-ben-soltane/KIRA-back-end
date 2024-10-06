const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Name of the category
    description: { type: String }, // Optional description of the category
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;