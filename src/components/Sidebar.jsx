import React from 'react';
import { Tag } from 'lucide-react';

export function Sidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside className="w-64 h-screen sticky top-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Categories
        </h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>All Products</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Tag className="h-4 w-4" />
                <span className="capitalize">{category}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}