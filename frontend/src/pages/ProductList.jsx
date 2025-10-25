// src/pages/ProductList.jsx
import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

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
            setError('Failed to load products. Please try again.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['all', ...new Set(products.map(p => p.category))];
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 py-8" data-testid="product-list-page">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">All Products</h1>
                    <p className="text-sm sm:text-base text-gray-600">Browse our complete collection of high-quality products</p>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-2 sm:gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition text-sm sm:text-base ${
                                filter === category
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                            data-testid={`filter-${category}`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
                        <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
                        <p>{error}</p>
                        <button 
                            onClick={fetchProducts}
                            className="mt-2 text-red-800 font-semibold hover:underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <>
                        <div className="mb-4 text-gray-600 text-sm sm:text-base">
                            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-600">Try selecting a different category</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductList;