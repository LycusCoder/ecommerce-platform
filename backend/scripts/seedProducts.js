// scripts/seedProducts.js
require('dotenv').config();
const { Product, syncDatabase } = require('../models');

const sampleProducts = [
    {
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones dengan noise cancellation dan battery life hingga 30 jam.',
        price: 1299000,
        stock: 50,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        is_active: true
    },
    {
        name: 'Smart Watch Pro',
        description: 'Smartwatch dengan fitur health tracking lengkap, GPS, dan tahan air 50 meter.',
        price: 2499000,
        stock: 30,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        is_active: true
    },
    {
        name: 'Mechanical Keyboard RGB',
        description: 'Mechanical keyboard gaming dengan RGB lighting dan switch cherry MX.',
        price: 899000,
        stock: 75,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        is_active: true
    },
    {
        name: 'Ultrawide Monitor 34"',
        description: 'Monitor ultrawide 34 inch dengan resolusi 3440x1440 dan refresh rate 144Hz.',
        price: 5499000,
        stock: 20,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        is_active: true
    },
    {
        name: 'Laptop Stand Aluminum',
        description: 'Stand laptop premium dari aluminum dengan adjustable height dan cable management.',
        price: 349000,
        stock: 100,
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        is_active: true
    },
    {
        name: 'USB-C Hub 7-in-1',
        description: 'USB-C hub dengan 7 port termasuk HDMI 4K, USB 3.0, dan SD card reader.',
        price: 299000,
        stock: 150,
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
        is_active: true
    }
];

const seedProducts = async () => {
    try {
        console.log('🌱 Starting product seeding...\n');
        
        // Sync database
        await syncDatabase();
        
        // Clear existing products (optional)
        // await Product.destroy({ where: {} });
        
        // Insert sample products
        for (const productData of sampleProducts) {
            const product = await Product.create(productData);
            console.log(`✅ Created: ${product.name} (Rp ${product.price.toLocaleString('id-ID')})`);
        }
        
        console.log(`\n🎉 Successfully seeded ${sampleProducts.length} products!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedProducts();
