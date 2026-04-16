'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CategoryCount {
  category: string;
  _count: number;
}

interface ProductFiltersProps {
  categoryCounts: CategoryCount[];
  currentCategory?: string;
}

export default function ProductFilters({ categoryCounts, currentCategory }: ProductFiltersProps) {
  const searchParams = useSearchParams();

  const categoryLabels: Record<string, { label: string; icon: string }> = {
    CUSTOM_CAKE: { label: 'Custom Cakes', icon: '🎂' },
    READY_MADE: { label: 'Ready Made', icon: '🧁' },
    SEASONAL: { label: 'Seasonal', icon: '🌸' },
    GIFT_BOX: { label: 'Gift Boxes', icon: '🎁' },
  };

  // Calculate total count
  const totalCount = categoryCounts.reduce((sum, cat) => sum + cat._count, 0);

  return (
    <div className="card sticky top-24">
      <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">
        Categories
      </h2>

      <div className="space-y-2">
        {/* All Products */}
        <Link
          href="/shop"
          className={`block px-4 py-3 rounded-xl transition-colors ${
            !currentCategory
              ? 'bg-primary-100 text-primary-700 font-semibold'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍰</span>
              <span>All Products</span>
            </div>
            <span className="text-sm bg-white px-2 py-1 rounded-lg">
              {totalCount}
            </span>
          </div>
        </Link>

        {/* Category Filters */}
        {categoryCounts.map((cat) => {
          const categoryInfo = categoryLabels[cat.category];
          const isActive = currentCategory?.toUpperCase() === cat.category;
          
          return (
            <Link
              key={cat.category}
              href={`/shop?category=${cat.category.toLowerCase()}`}
              className={`block px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryInfo.icon}</span>
                  <span>{categoryInfo.label}</span>
                </div>
                <span className="text-sm bg-white px-2 py-1 rounded-lg">
                  {cat._count}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Filter Info */}
      {currentCategory && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href="/shop"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-2"
          >
            <span>×</span>
            Clear filter
          </Link>
        </div>
      )}
    </div>
  );
}
