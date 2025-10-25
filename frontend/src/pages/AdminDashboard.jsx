// src/pages/AdminDashboard.jsx - LAZY LOADED
import { useState } from 'react';
import { productAPI } from '../services/api';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image_url: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await productAPI.createProduct({
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
            });
            
            setMessage({ type: 'success', text: 'Product created successfully!' });
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                image_url: '',
            });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to create product. Please try again.' });
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8" data-testid="admin-dashboard">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600 mb-8">Add new products to your store</p>

                    {/* Success/Error Message */}
                    {message.text && (
                        <div
                            className={`mb-6 px-4 py-3 rounded-lg ${
                                message.type === 'success'
                                    ? 'bg-green-100 text-green-700 border border-green-400'
                                    : 'bg-red-100 text-red-700 border border-red-400'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Create Product Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Premium Wireless Headphones"
                                    data-testid="product-name-input"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Electronics"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Detailed product description..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price (IDR) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="1000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="1299000"
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Stock *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="50"
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="https://images.unsplash.com/photo-..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-primary-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                data-testid="submit-product-btn"
                            >
                                {loading ? 'Creating...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;