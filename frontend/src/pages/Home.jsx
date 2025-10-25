// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productAPI.getAllProducts();
                // Get first 3 products as featured
                setFeaturedProducts(response.data.slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="min-h-screen" data-testid="home-page">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-12 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Welcome to <span className="text-primary-600">EcomStore</span> 🚀
                        </h1>
                        <p className="text-base sm:text-xl text-gray-700 mb-6 sm:mb-8">
                            Platform e-commerce modern dengan performa tinggi. Temukan produk terbaik dengan load time di bawah 2 detik!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/products"
                                className="bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-700 transition"
                                data-testid="browse-products-btn"
                            >
                                Browse Products
                            </Link>
                            <Link
                                to="/admin"
                                className="bg-white text-primary-600 border-2 border-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-50 transition"
                            >
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl sm:text-5xl mb-4">⚡</div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Lightning Fast</h3>
                            <p className="text-sm sm:text-base text-gray-600">Load time di bawah 2 detik dengan Redis caching</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl sm:text-5xl mb-4">🔒</div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Secure Payment</h3>
                            <p className="text-sm sm:text-base text-gray-600">Integrasi Stripe untuk transaksi aman</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-4xl sm:text-5xl mb-4">📱</div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Mobile First</h3>
                            <p className="text-sm sm:text-base text-gray-600">Responsive design untuk semua device</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Featured Products</h2>
                        <Link
                            to="/products"
                            className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base"
                        >
                            View All Products →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            <p className="mt-4 text-gray-600">Loading products...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 bg-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                    <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
                        Explore our complete catalog of high-quality products
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;