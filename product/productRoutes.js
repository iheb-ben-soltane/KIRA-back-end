const express = require('express');
const { getProducts, getProductById, createProduct } = require('../product/productController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { verifyToken } = require('../authentication/authMiddleware');


// router.route('/').get(getProducts).post(protect, createProduct); // Get all products, create product
// router.route('/:id').get(getProductById); // Get product by ID

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products/create', verifyToken, createProduct);

module.exports = router;