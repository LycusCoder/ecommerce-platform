// routes/index.js
const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');

// Health check
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'E-commerce API is healthy! 🚀',
        timestamp: new Date().toISOString()
    });
});

// Mount routes
router.use('/products', productRoutes);

module.exports = router;