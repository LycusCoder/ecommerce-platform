// services/productService.js
const { Product } = require('../models');
const { redisClient } = require('../config/redis');

class ProductService {
    // Get all products with Redis caching
    async getAllProducts() {
        const cacheKey = 'products:all';
        
        try {
            // Check Redis cache first
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log('⚡ Cache HIT - Products loaded from Redis');
                return JSON.parse(cachedData);
            }
            
            // If not in cache, fetch from database
            console.log('📦 Cache MISS - Fetching from PostgreSQL');
            const products = await Product.findAll({
                where: { is_active: true },
                order: [['created_at', 'DESC']]
            });
            
            // Store in Redis cache (expire in 5 minutes)
            await redisClient.setEx(cacheKey, 300, JSON.stringify(products));
            
            return products;
        } catch (error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }
    
    // Get product by ID
    async getProductById(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Failed to fetch product: ${error.message}`);
        }
    }
    
    // Create new product
    async createProduct(productData) {
        try {
            const product = await Product.create(productData);
            
            // Invalidate cache
            await redisClient.del('products:all');
            
            return product;
        } catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }
}

module.exports = new ProductService();