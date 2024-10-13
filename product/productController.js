const asyncHandler = require('express-async-handler');
const Product = require('../product/productModel');
const Category = require('../category/categoryModel');
const { uploadBlob } = require('../helpers/azureBlobService');

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

  //  category exists ?
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

// Add photos to a product
const addPhotosToProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id; 
  const images = req.files; 
  const userId = req.user.id;


  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Verify if the user is the owner of the product
  if (product.owner.toString() !== userId) {
    res.status(403);
    throw new Error('You are not authorized to modify this product');
  }

   // Check if adding the new images exceeds the 10 image limit
   if (product.images.length + images.length > 10) {
    res.status(400);
    throw new Error('Product cannot have more than 10 images');
  }

  const imageUrls = [];

  for (const image of images) {
    const blobURL = await uploadBlob(image.buffer); // upload to Azure
    imageUrls.push(blobURL); 
  }

  product.images.push(...imageUrls);

  await product.save();

  // houni lezm nzido naraw chno a7san haja lezm nraj3ouha pour le moment awki message w array of images
  res.status(200).json({
    message: 'Photos added successfully',
    images: product.images,
  });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  addPhotosToProduct,
};