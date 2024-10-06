const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');

// Get all subcategories
const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find({});
  res.json(subCategories);
});

// Create a new subcategory
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const subCategory = new SubCategory({ name, description, categoryId });
  const createdSubCategory = await subCategory.save();
  res.status(201).json(createdSubCategory);
});

module.exports = {
  getSubCategories,
  createSubCategory
};