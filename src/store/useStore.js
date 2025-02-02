import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create store with persistence
export const useStore = create(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),

      // Cart state
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: quantity === 0
            ? state.cart.filter((item) => item.id !== productId)
            : state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
        })),

      // Theme state
      darkMode: false,
      toggleDarkMode: () => 
        set((state) => {
          const newDarkMode = !state.darkMode;
          // Update body class
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newDarkMode };
        }),
    }),
    {
      name: 'shop-storage', // unique name for localStorage
    }
  )
);