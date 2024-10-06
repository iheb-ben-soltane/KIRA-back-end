const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct); // Get all products, create product
router.route('/:id').get(getProductById); // Get product by ID

module.exports = router;