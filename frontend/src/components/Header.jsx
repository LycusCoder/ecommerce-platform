// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary-600">
                        🛒 EcomStore
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary-600 transition">
                            Products
                        </Link>
                        <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition">
                            Admin
                        </Link>
                        <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        data-testid="mobile-menu-button"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4">
                        <Link
                            to="/"
                            className="block text-gray-700 hover:text-primary-600 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="block text-gray-700 hover:text-primary-600 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/admin"
                            className="block text-gray-700 hover:text-primary-600 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin
                        </Link>
                        <button className="w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                            Login
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;