// src/components/LoadingSkeleton.jsx

export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="h-48 sm:h-64 bg-gray-300"></div>
        <div className="p-4 sm:p-5 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-10 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div>
    </div>
);

export const ProductDetailSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-xl shadow-lg p-4 sm:p-8 animate-pulse">
        <div className="h-96 bg-gray-300 rounded-lg"></div>
        <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
            <div className="h-12 bg-gray-300 rounded w-full"></div>
        </div>
    </div>
);

export default ProductCardSkeleton;
