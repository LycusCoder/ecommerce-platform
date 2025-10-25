// controllers/productController.js
const productService = require('../services/productService');

class ProductController {
    // GET /api/products
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    
    // GET /api/products/:id
    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
    
    // POST /api/products
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new ProductController();