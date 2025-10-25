// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'ecommerce_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false, // Set true untuk debug SQL queries
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to PostgreSQL:', error.message);
    }
};

module.exports = { sequelize, testConnection };