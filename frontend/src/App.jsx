// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

// Lazy load Admin Dashboard for performance
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Loading component
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route
                        path="admin"
                        element={
                            <Suspense fallback={<LoadingSpinner />}>
                                <AdminDashboard />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                                    <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                                    <a
                                        href="/"
                                        className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                                    >
                                        Go Home
                                    </a>
                                </div>
                            </div>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;