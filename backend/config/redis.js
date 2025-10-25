// config/redis.js
const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

redisClient.on('connect', () => {
    console.log('✅ Redis client connected');
});

redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err.message);
});

// Connect to Redis
const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('❌ Redis connection failed:', error.message);
    }
};

module.exports = { redisClient, connectRedis };