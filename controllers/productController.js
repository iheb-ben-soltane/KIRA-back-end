const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

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

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, categoryId, subCategoryId } = req.body;
  const product = new Product({
    name,
    description,
    price,
    categoryId,
    subCategoryId,
    userId: req.user._id
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct
};