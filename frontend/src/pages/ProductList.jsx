// src/pages/ProductList.jsx
import { useState, useEffect, useMemo } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getAllProducts();
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError('Gagal memuat produk. Silakan coba lagi.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['all', ...new Set(products.map(p => p.category))];
    
    // Filter and search products
    const filteredProducts = useMemo(() => {
        let result = products;

        // Apply category filter
        if (filter !== 'all') {
            result = result.filter(p => p.category === filter);
        }

        // Apply search
        if (searchQuery) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case 'price-high':
                result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case 'name':
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return result;
    }, [products, filter, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" data-testid="product-list-page">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
                        Semua <span className="text-primary-600">Produk</span>
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Jelajahi koleksi lengkap produk berkualitas tinggi kami
                    </p>
                </div>

                {/* Search and Sort Bar */}
                <div className="mb-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                data-testid="search-input"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition appearance-none cursor-pointer"
                                data-testid="sort-select"
                            >
                                <option value="default">Urutkan: Default</option>
                                <option value="price-low">Harga: Rendah ke Tinggi</option>
                                <option value="price-high">Harga: Tinggi ke Rendah</option>
                                <option value="name">Nama: A-Z</option>
                            </select>
                            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 text-sm sm:text-base shadow-md ${
                                filter === category
                                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                            data-testid={`filter-${category}`}
                        >
                            {category === 'all' ? '🛍️ Semua' : `📦 ${category.charAt(0).toUpperCase() + category.slice(1)}`}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
                        <p className="font-semibold mb-2">❌ {error}</p>
                        <button 
                            onClick={fetchProducts}
                            className="mt-2 text-red-800 font-bold hover:underline"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <>
                        {/* Product Count */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="text-sm sm:text-base text-gray-600">
                                Menampilkan <span className="font-bold text-primary-600">{filteredProducts.length}</span> produk
                                {searchQuery && (
                                    <span className="ml-2">
                                        untuk "<span className="font-bold">{searchQuery}</span>"
                                    </span>
                                )}
                            </div>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                                >
                                    Hapus Pencarian
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h3>
                                <p className="text-gray-600 mb-6">
                                    {searchQuery 
                                        ? `Tidak ada produk yang cocok dengan "${searchQuery}"`
                                        : 'Coba pilih kategori lain'}
                                </p>
                                <button
                                    onClick={() => {
                                        setFilter('all');
                                        setSearchQuery('');
                                    }}
                                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                                >
                                    Lihat Semua Produk
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductList;