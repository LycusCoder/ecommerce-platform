// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
            className="group"
            data-testid={`product-card-${product.id}`}
        >
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                {/* Product Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden bg-gray-100">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Low Stock
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Out of Stock
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5">
                    {/* Category */}
                    <div className="text-xs sm:text-sm text-primary-600 font-semibold mb-2">
                        {product.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price & Stock */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-lg sm:text-xl font-bold text-gray-900">
                                {formatPrice(product.price)}
                            </div>
                            <div className="text-xs text-gray-500">
                                Stock: {product.stock}
                            </div>
                        </div>
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm sm:text-base">
                            View
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;