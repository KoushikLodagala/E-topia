import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
};

export function ProductCard({ product, onProductClick }) {
  const { addToCart } = useStore();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
    >
      <div className="relative pt-[100%]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-500 capitalize">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {/* 💲{product.price} */}
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}