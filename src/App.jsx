import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartModal } from './components/CartModal';
import { useStore } from './store/useStore';

function App() {
  // State for UI controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Get dark mode from store
  const { darkMode } = useStore();

  // Initialize dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch products and categories
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      // Replace 'electronics' category with 'kids'
      return data.map(product => ({
        ...product,
        category: product.category === 'electronics' ? 'kids' : product.category,
        // Add kids-specific images for the kids category
        image: product.category === 'electronics' 
          ? 'https://images.unsplash.com/photo-1545997281-2cfe4d4b740f?w=800&h=800&fit=crop' // Kids toy image
          : product.image
      }));
    }
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      // Replace 'electronics' with 'kids' in categories
      return data.map(category => category === 'electronics' ? 'kids' : category);
    }
  });

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <div className="flex">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <main className="flex-1 p-6">
            {productsLoading || categoriesLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {isCartOpen && (
          <CartModal onClose={() => setIsCartOpen(false)} />
        )}

        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default App;