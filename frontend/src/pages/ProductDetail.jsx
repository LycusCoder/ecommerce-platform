// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);

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
            setError('Produk tidak ditemukan');
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

    const handleAddToCart = () => {
        showToast(`${product.name} berhasil ditambahkan ke keranjang! (${quantity} item)`, 'success');
        // TODO: Implement actual cart functionality
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <ProductDetailSkeleton />
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center animate-fade-in">
                    <div className="text-6xl mb-4">🚫</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        to="/products"
                        className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                    >
                        Kembali ke Produk
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" data-testid="product-detail-page">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm bg-white px-4 py-3 rounded-lg shadow-sm" aria-label="Breadcrumb">
                    <Link to="/" className="text-gray-600 hover:text-primary-600 transition">Home</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/products" className="text-gray-600 hover:text-primary-600 transition">Produk</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
                    {/* Product Image */}
                    <div className="relative group">
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            </div>
                        )}
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className={`w-full h-96 sm:h-[500px] object-cover rounded-2xl shadow-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                        {product.stock === 0 && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-bold shadow-lg">
                                Stok Habis
                            </div>
                        )}
                        {product.stock > 0 && product.stock < 10 && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-5 py-2 rounded-full font-bold shadow-lg">
                                Stok Terbatas
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <div className="inline-block mb-3">
                                <span className="text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-full">
                                    📦 {product.category}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <div className="text-4xl sm:text-5xl font-extrabold text-primary-600 mb-3">
                                {formatPrice(product.price)}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">Ketersediaan:</span>
                                <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock > 0 ? `✓ Tersedia (${product.stock} unit)` : '✗ Stok Habis'}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        {product.stock > 0 && (
                            <div className="mb-8">
                                <label className="block text-base font-bold text-gray-900 mb-3">
                                    Jumlah
                                </label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition font-bold text-lg disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-12 h-12 bg-gray-100 rounded-xl hover:bg-gray-200 transition font-bold text-lg disabled:opacity-50"
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
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 sm:py-5 rounded-xl font-bold transition-all text-base sm:text-lg transform hover:scale-105 shadow-lg ${
                                    product.stock > 0
                                        ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:from-primary-700 hover:to-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={product.stock === 0}
                                data-testid="add-to-cart-btn"
                            >
                                {product.stock > 0 ? '🛒 Tambah ke Keranjang' : 'Stok Habis'}
                            </button>
                        </div>
                        
                        <button
                            onClick={() => navigate('/products')}
                            className="mt-4 w-full bg-white border-2 border-primary-600 text-primary-600 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all"
                        >
                            ← Kembali ke Produk
                        </button>

                        {/* Product Details */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Produk</h3>
                            <ul className="space-y-3 text-sm sm:text-base">
                                <li className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">ID Produk:</span>
                                    <span className="font-mono text-xs font-semibold text-gray-900">{product.id}</span>
                                </li>
                                <li className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Kategori:</span>
                                    <span className="font-bold text-gray-900">{product.category}</span>
                                </li>
                                <li className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? '✓ Tersedia' : '✗ Habis'}
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