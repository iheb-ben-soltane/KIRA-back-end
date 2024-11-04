const express = require('express');
const { getProducts, getProductById, createProduct,addPhotosToProduct } = require('../product/productController');
const router = express.Router();
const { verifyToken } = require('../authentication/authMiddleware');
const upload = require('../../config/multerConfig');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products/create', verifyToken, createProduct);
router.post('/products/:id/photos', verifyToken, upload.array('photos', 10), addPhotosToProduct);


module.exports = router;