// models/index.js
const { sequelize } = require('../config/database');
const Product = require('./Product');
const User = require('./User');

// Define relationships here (jika diperlukan)
// Example: User.hasMany(Order);

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Use { force: true } untuk drop tables
        console.log('✅ Database synced successfully');
    } catch (error) {
        console.error('❌ Database sync failed:', error.message);
    }
};

module.exports = {
    sequelize,
    Product,
    User,
    syncDatabase
};