// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-3xl transform group-hover:scale-110 transition-transform">🛒</span>
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                            EcomStore
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className={`font-semibold transition-all hover:text-primary-600 ${
                                isActive('/') ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'text-gray-700'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/products" 
                            className={`font-semibold transition-all hover:text-primary-600 ${
                                isActive('/products') || location.pathname.startsWith('/products/') 
                                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1' 
                                    : 'text-gray-700'
                            }`}
                        >
                            Produk
                        </Link>
                        <Link 
                            to="/admin" 
                            className={`font-semibold transition-all hover:text-primary-600 ${
                                isActive('/admin') ? 'text-primary-600 border-b-2 border-primary-600 pb-1' : 'text-gray-700'
                            }`}
                        >
                            Admin
                        </Link>
                        <button className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-primary-700 hover:to-blue-700 transition-all font-bold shadow-md hover:shadow-lg transform hover:scale-105">
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition"
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
                    <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
                        <Link
                            to="/"
                            className={`block py-2 px-4 rounded-lg font-semibold transition ${
                                isActive('/') 
                                    ? 'bg-primary-600 text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className={`block py-2 px-4 rounded-lg font-semibold transition ${
                                isActive('/products') || location.pathname.startsWith('/products/') 
                                    ? 'bg-primary-600 text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Produk
                        </Link>
                        <Link
                            to="/admin"
                            className={`block py-2 px-4 rounded-lg font-semibold transition ${
                                isActive('/admin') 
                                    ? 'bg-primary-600 text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin
                        </Link>
                        <button className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-blue-700 transition font-bold">
                            Login
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;