// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-3xl">🛒</span>
                            <h3 className="text-2xl font-extrabold">EcomStore</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Platform e-commerce modern dengan performa tinggi dan pengalaman berbelanja terbaik untuk Anda.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition transform hover:scale-110">
                                <span>📘</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition transform hover:scale-110">
                                <span>📷</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition transform hover:scale-110">
                                <span>🐦</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-primary-400">Link Cepat</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    Produk
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    Tentang Kami
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-primary-400">Kategori</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                                    <span>💻</span> Electronics
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                                    <span>🎧</span> Accessories
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                                    <span>👕</span> Fashion
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                                    <span>📱</span> Gadgets
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-primary-400">Hubungi Kami</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-2 hover:text-white transition">
                                <span>📧</span>
                                <a href="mailto:info@ecomstore.com">info@ecomstore.com</a>
                            </li>
                            <li className="flex items-center gap-2 hover:text-white transition">
                                <span>📱</span>
                                <a href="tel:+628123456789">+62 812 3456 7890</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📍</span>
                                <span>Jakarta, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>⏰</span>
                                <span>24/7 Support</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-gray-700 pt-8 mb-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-xl font-bold mb-3">📬 Berlangganan Newsletter</h4>
                        <p className="text-gray-400 mb-4">Dapatkan update produk terbaru dan promo eksklusif!</p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-blue-700 transition transform hover:scale-105">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-400 mb-2">
                        &copy; {currentYear} EcomStore. Semua hak dilindungi.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Dibuat dengan <span className="text-red-500">❤️</span> menggunakan <span className="text-primary-400 font-semibold">Node.js</span>, <span className="text-blue-400 font-semibold">React</span>, <span className="text-blue-600 font-semibold">PostgreSQL</span> & <span className="text-red-400 font-semibold">Redis</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;