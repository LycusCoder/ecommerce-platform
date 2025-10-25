// src/pages/AdminDashboard.jsx - LAZY LOADED
import { useState } from 'react';
import { productAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const AdminDashboard = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image_url: '',
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Update image preview when image URL changes
        if (name === 'image_url') {
            setImagePreview(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await productAPI.createProduct({
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
            });
            
            showToast('✅ Produk berhasil dibuat!', 'success');
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                image_url: '',
            });
            setImagePreview('');
        } catch (error) {
            showToast('❌ Gagal membuat produk. Silakan coba lagi.', 'error');
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" data-testid="admin-dashboard">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-100">
                    {/* Header */}
                    <div className="mb-8 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="text-4xl">⚙️</div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600">
                            Tambahkan produk baru ke toko Anda dengan mudah
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Product Name & Category */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Nama Produk *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                            placeholder="Contoh: Headphone Premium"
                                            data-testid="product-name-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Kategori *
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                            placeholder="Contoh: Electronics"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Deskripsi *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                                        placeholder="Deskripsi produk secara lengkap..."
                                    />
                                </div>

                                {/* Price & Stock */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Harga (IDR) *
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            step="1000"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                            placeholder="1.299.000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">
                                            Stok *
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                            placeholder="50"
                                        />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        URL Gambar
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                        placeholder="https://images.unsplash.com/photo-..."
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Masukkan URL gambar produk (opsional)
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 sm:py-5 rounded-xl font-bold hover:from-primary-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg text-lg"
                                    data-testid="submit-product-btn"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Membuat Produk...
                                        </span>
                                    ) : (
                                        '✨ Buat Produk Baru'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Image Preview Section */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Preview Gambar</h3>
                                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-200">
                                    {imagePreview ? (
                                        <div className="space-y-3">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-64 object-cover rounded-xl shadow-md"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                                                }}
                                            />
                                            <p className="text-xs text-gray-600 text-center">
                                                Preview gambar produk
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                            <svg className="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm font-medium">Tidak ada gambar</p>
                                            <p className="text-xs mt-1">Masukkan URL untuk preview</p>
                                        </div>
                                    )}
                                </div>

                                {/* Info Card */}
                                <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                        <span>💡</span> Tips
                                    </h4>
                                    <ul className="text-xs text-blue-800 space-y-1">
                                        <li>• Gunakan gambar berkualitas tinggi</li>
                                        <li>• Ukuran gambar optimal: 800x600px</li>
                                        <li>• Format: JPG, PNG, atau WEBP</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;