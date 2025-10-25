// server.js - E-commerce API Entry Point
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import configurations
const { testConnection } = require('./config/database');
const { connectRedis } = require('./config/redis');
const { syncDatabase } = require('./models');

// Import routes
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'E-commerce API is running! 🚀',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            products: '/api/products'
        }
    });
});

// Mount API routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Initialize and start server
const startServer = async () => {
    try {
        // Test database connection
        await testConnection();
        
        // Connect to Redis
        await connectRedis();
        
        // Sync database models
        await syncDatabase();
        
        // Start listening
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n🚀 Server is running on port ${PORT}`);
            console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API: http://localhost:${PORT}/api`);
            console.log(`\n✅ All services initialized successfully!\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;
