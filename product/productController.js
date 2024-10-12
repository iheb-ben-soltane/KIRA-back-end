const asyncHandler = require('express-async-handler');
const Product = require('../product/productModel');
const Category = require('../category/categoryModel');

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, images, description, sellOrRent, price, reservedDays, category } = req.body;
  // Check if the category exists
  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    return res.status(400).json({ msg: 'Invalid category ID' });
  }

  // Assign the owner ID from the JWT token
  const owner = req.user.id;

  const product = new Product({ name, images, description, sellOrRent, price, reservedDays, category, owner });
  await product.save();
  
  res.status(201).json(product);
});


module.exports = {
  getProducts,
  getProductById,
  createProduct
};