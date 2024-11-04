const asyncHandler = require('express-async-handler');
const Category = require('../category/categoryModel');

// Get all categories
const getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get category by ID
const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404);
      return next({ messageKey: 'error.category_not_found' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Create a new category
const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
};