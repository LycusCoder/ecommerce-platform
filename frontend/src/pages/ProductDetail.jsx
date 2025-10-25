// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    const fetchProductDetail = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getProductById(id);
            setProduct(response.data);
            setError(null);
        } catch (err) {
            setError('Product not found');
            console.error('Error fetching product detail:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        to="/products"
                        className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8" data-testid="product-detail-page">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
                    <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/products" className="text-gray-600 hover:text-primary-600">Products</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 font-semibold">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-xl shadow-lg p-4 sm:p-8">
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-64 sm:h-96 lg:h-full object-cover rounded-lg"
                        />
                        {product.stock === 0 && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                                Out of Stock
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-primary-600 mb-2">
                                {product.category}
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                {product.description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                                {formatPrice(product.price)}
                            </div>
                            <div className="text-sm text-gray-600">
                                Stock Available: <span className="font-semibold text-gray-900">{product.stock}</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        {product.stock > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Quantity
                                </label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                                        disabled={quantity >= product.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button
                                className={`flex-1 py-3 sm:py-4 rounded-lg font-semibold transition text-sm sm:text-base ${
                                    product.stock > 0
                                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={product.stock === 0}
                                data-testid="add-to-cart-btn"
                            >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            <button
                                onClick={() => navigate('/products')}
                                className="flex-1 bg-white border-2 border-primary-600 text-primary-600 py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary-50 transition text-sm sm:text-base"
                            >
                                Back to Products
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
                            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                                <li className="flex justify-between">
                                    <span>Product ID:</span>
                                    <span className="font-mono text-xs">{product.id}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Category:</span>
                                    <span className="font-semibold">{product.category}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Availability:</span>
                                    <span className={product.stock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;