const asyncHandler = require('express-async-handler');
const Product = require('../product/productModel');
const Category = require('../category/categoryModel');
const { uploadBlob,getPhotoByBlobURL } = require('../../helpers/azureBlobService');
const { resizeImageIfNeeded } = require('../../helpers/resizeImage');
// Get all products
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get product by ID
const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      ;
      return next({ messageKey: 'error.product_not_found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Create product
const createProduct = asyncHandler(async (req, res, next) => {
  const { name, images, description, sellOrRent, price, reservedDays, category } = req.body;

  try {
    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      ;
      return next({ messageKey: 'error.invalid_category' });
    }

    // Assign the owner ID from the JWT token
    const owner = req.user.id;

    const product = new Product({ name, images, description, sellOrRent, price, reservedDays, category, owner });// ??????
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});




// Add photos to a product
const addPhotosToProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id; 
  const images = req.files; 
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      ;
      return next({ messageKey: 'error.product_not_found' });
    }

    // Verify if the user is the owner of the product
    if (product.owner.toString() !== userId) {
      ;
      return next({ messageKey: 'error.not_authorized' });
    }

    // Check if images are provided
    if (!images || images.length === 0) {
      ;
      return next({ messageKey: 'error.no_images_provided' });
    }

    // Check if adding the new images exceeds the 10 image limit
    if (product.images.length + images.length > 10) {
      ;
      return next({ messageKey: 'error.max_images_exceeded' });
    }

    const imageUrls = [];
    await product.populate('owner');// the ownerIdd is replaced by the owner object
    for (const image of images) {
      let imageBuffer = image.buffer;
      
      // Resize image if it exceeds 1MB
      imageBuffer = await resizeImageIfNeeded(imageBuffer);
      
      const blobURL = await uploadBlob(imageBuffer, product.owner.email); // upload to Azure
      const lastPart = blobURL.substring(blobURL.lastIndexOf('/') + 1);
      imageUrls.push(lastPart); 
    }

    product.images.push(...imageUrls);

    await product.save();

    // Return a success message and array of images
    res.status(200).json({
      message: 'Photos added successfully',
      images: product.images,
    });
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});

// Get the photo of a product
const getProductPhoto = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const imageIndex = req.params.index;

  try {
    const product = await Product.findById(productId).populate('owner');
    if (!product || !product.images || product.images.length<=imageIndex) {
      return next({ messageKey: 'error.photo_not_found' });
    }

    if (!product.owner || !product.owner.email) {
      ;
      return next({ messageKey: 'error.owner_email_not_found' });
    }

    const photoStream = await getPhotoByBlobURL(product.images[imageIndex], product.owner.email);

    photoStream.pipe(res);
  } catch (err) {
    console.error(err.message);
    next({ messageKey: 'error.internal_server' });
  }
});


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  addPhotosToProduct,
  getProductPhoto,
};