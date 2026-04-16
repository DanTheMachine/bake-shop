import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface ProductGridProps {
  products: any[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="font-display text-2xl font-semibold mb-2 text-neutral-charcoal">No products found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters or check back soon for new treats!</p>
        <Link href="/shop" className="btn-primary inline-flex">View All Products</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const categoryLabels: Record<string, string> = {
    CUSTOM_CAKE: 'Custom Cake',
    READY_MADE: 'Ready Made',
    SEASONAL: 'Seasonal',
    GIFT_BOX: 'Gift Box',
  };

  const categoryColors: Record<string, string> = {
    CUSTOM_CAKE: 'bg-accent-lavender text-purple-900',
    READY_MADE: 'bg-primary-100 text-primary-700',
    SEASONAL: 'bg-secondary-200 text-secondary-900',
    GIFT_BOX: 'bg-accent-mint text-green-900',
  };

  const emojiMap: Record<string, string> = {
    'Classic Chocolate Cake': '🍫',
    'Vanilla Bean Cupcakes (6-pack)': '🧁',
    'Strawberry Shortcake': '🍓',
    'Custom Birthday Cake': '🎂',
    'Assorted Cookie Box': '🍪',
    'Lemon Blueberry Loaf': '🍋',
    'Red Velvet Cake': '❤️',
    'Holiday Gift Basket': '🎁',
  };

  const emoji = emojiMap[product.name] || '🧁';

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="relative h-64 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
          <span className="text-8xl">{emoji}</span>
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[product.category]}`}>
              {categoryLabels[product.category]}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-xl font-semibold mb-2 text-neutral-charcoal group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="font-display text-2xl font-bold text-primary-500">
              {formatPrice(Number(product.price))}
            </span>
            
            {product.requires_custom_form ? (
              <span className="text-sm text-gray-500 italic">Custom Order</span>
            ) : (
              <button className="btn-primary text-sm px-4 py-2">Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}