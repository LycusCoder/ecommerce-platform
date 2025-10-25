// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link 
            to={`/products/${product.id}`}
            className="group block"
            data-testid={`product-card-${product.id}`}
        >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100">
                {/* Product Image with overlay effect */}
                <div className="relative h-56 sm:h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    )}
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                    />
                    
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Stock badges */}
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Stok Terbatas
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Habis
                        </div>
                    )}
                    
                    {/* Quick view button on hover */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="bg-white text-primary-600 px-5 py-2 rounded-full text-sm font-bold shadow-xl hover:bg-primary-600 hover:text-white transition-colors">
                            Lihat Detail →
                        </span>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-5 sm:p-6">
                    {/* Category badge */}
                    <div className="inline-block mb-3">
                        <span className="text-xs sm:text-sm text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full">
                            {product.category}
                        </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3.5rem]">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                        {product.description}
                    </p>

                    {/* Price & Stock */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                            <div className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {formatPrice(product.price)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                <span className={product.stock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                    {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white group-hover:bg-primary-700 transition-colors shadow-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;