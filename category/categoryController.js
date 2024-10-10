const asyncHandler = require('express-async-handler');
const Category = require('../category/categoryModel');

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// Get category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ msg: 'Category not found' });
  }
  res.status(200).json(category);
});

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({ name, description });
  await category.save();
  res.status(201).json(category);
});

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
};