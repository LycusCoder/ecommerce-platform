// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAllProducts.bind(productController));

// GET product by ID
router.get('/:id', productController.getProductById.bind(productController));

// POST create new product
router.post('/', productController.createProduct.bind(productController));

module.exports = router;