const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({ name, description });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

module.exports = {
  getCategories,
  createCategory
};