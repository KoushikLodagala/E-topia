import React from 'react';
import { X, ShoppingCart, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
};

export function ProductModal({ product, onClose }) {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-blue-500 capitalize">
                {product.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {product.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg text-gray-600 dark:text-gray-300">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {/* ${product.price} */}
                {formatPrice(product.price)}
              </span>
              <button
                onClick={handleAddToCart}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}