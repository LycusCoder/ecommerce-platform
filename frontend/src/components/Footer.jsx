// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">🛒 EcomStore</h3>
                        <p className="text-gray-400">
                            Platform e-commerce modern dengan performa tinggi dan pengalaman berbelanja terbaik.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-white transition">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="text-gray-400 hover:text-white transition">
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400 hover:text-white transition cursor-pointer">Electronics</li>
                            <li className="text-gray-400 hover:text-white transition cursor-pointer">Accessories</li>
                            <li className="text-gray-400 hover:text-white transition cursor-pointer">Fashion</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>📧 info@ecomstore.com</li>
                            <li>📱 +62 812 3456 7890</li>
                            <li>📍 Jakarta, Indonesia</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} EcomStore. Built with ❤️ using Node.js, React, PostgreSQL & Redis.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;