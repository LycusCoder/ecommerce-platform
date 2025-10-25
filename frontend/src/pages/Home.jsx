// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';

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
            {/* Hero Section with Gradient */}
            <section className="relative bg-gradient-to-br from-blue-600 via-primary-600 to-purple-700 py-16 sm:py-24 overflow-hidden">
                {/* Animated background shapes */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block animate-bounce-in">
                            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Selamat Datang di<br />
                                <span className="text-yellow-300">EcomStore</span> 🚀
                            </h1>
                        </div>
                        <p className="text-lg sm:text-2xl text-white/90 mb-8 animate-fade-in">
                            Platform e-commerce modern dengan performa tinggi.<br className="hidden sm:block" />
                            Temukan produk terbaik dengan <span className="font-bold text-yellow-300">load time &lt; 2 detik!</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <Link
                                to="/products"
                                className="group bg-white text-primary-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:bg-yellow-300 hover:text-primary-700 transition-all transform hover:scale-105 shadow-xl"
                                data-testid="browse-products-btn"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Lihat Produk
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                to="/admin"
                                className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:bg-white hover:text-primary-600 transition-all transform hover:scale-105 shadow-xl"
                            >
                                Admin Dashboard
                            </Link>
                        </div>
                        
                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <div className="text-center">
                                <div className="text-2xl sm:text-4xl font-bold text-white mb-1">100+</div>
                                <div className="text-xs sm:text-sm text-white/80">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-4xl font-bold text-white mb-1">&lt;2s</div>
                                <div className="text-xs sm:text-sm text-white/80">Load Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl sm:text-4xl font-bold text-white mb-1">24/7</div>
                                <div className="text-xs sm:text-sm text-white/80">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section with Enhanced Design */}
            <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                            Mengapa Memilih <span className="text-primary-600">EcomStore</span>?
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Pengalaman berbelanja terbaik dengan teknologi modern dan layanan terpercaya
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                            <div className="text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 transition-transform">⚡</div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Super Cepat</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Load time di bawah 2 detik dengan Redis caching dan optimisasi performa maksimal
                            </p>
                        </div>
                        <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                            <div className="text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 transition-transform">🔒</div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Pembayaran Aman</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Integrasi Stripe untuk transaksi aman dan terpercaya dengan enkripsi tingkat tinggi
                            </p>
                        </div>
                        <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                            <div className="text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 transition-transform">📱</div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">Mobile Friendly</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Responsive design yang sempurna di semua perangkat, dari mobile hingga desktop
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products with Better Design */}
            <section className="py-16 sm:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 sm:mb-14">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                                Produk <span className="text-primary-600">Unggulan</span>
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Pilihan terbaik untuk Anda
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-bold text-sm sm:text-base flex items-center gap-2 group"
                        >
                            Lihat Semua Produk
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
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

            {/* CTA Section with Gradient */}
            <section className="relative py-16 sm:py-20 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                        Siap Memulai Belanja? 🛍️
                    </h2>
                    <p className="text-base sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Jelajahi katalog lengkap produk berkualitas tinggi dengan harga terbaik
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-white text-primary-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Belanja Sekarang
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;