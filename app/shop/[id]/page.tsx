import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/layout/header';
import AddToCartButton from '@/components/products/add-to-cart-button';
import ProductReviews from '@/components/products/product-reviews';
import ShareButton from '@/components/ui/share-button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('id', id)
    .single();

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Rise By Amy`,
      description: product.description,
      url: `/shop/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Rise By Amy`,
      description: product.description,
    },
  };
}

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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  const categoryLabels: Record<string, string> = {
    CUSTOM_CAKE: 'Custom Cake',
    READY_MADE: 'Ready Made',
    SEASONAL: 'Seasonal',
    GIFT_BOX: 'Gift Box',
  };

  const emoji = emojiMap[product.name] || '🧁';

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-500">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-primary-500">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-neutral-charcoal font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <span className="text-9xl">{emoji}</span>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {categoryLabels[product.category] ?? product.category}
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-4xl font-bold text-primary-500">
                  {formatPrice(Number(product.price))}
                </span>
              </div>

              <div className="prose prose-lg mb-8">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-8">
                {product.available ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="font-medium">In Stock - Fresh Daily</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    <span className="font-medium">Currently Unavailable</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <ShareButton title={product.name} text={`Check out ${product.name} from Rise By Amy!`} />
              </div>

              {product.requires_custom_form ? (
                <div className="space-y-4">
                  <Link href="/custom-cakes" className="btn-primary w-full text-center block">
                    Request Custom Quote
                  </Link>
                  <p className="text-sm text-gray-600 text-center">
                    This item requires a custom order.
                  </p>
                </div>
              ) : (
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    available: product.available,
                  }}
                  emoji={emoji}
                />
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-display text-lg font-semibold mb-4">Product Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span className="text-gray-700">Made fresh daily with premium ingredients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span className="text-gray-700">No artificial preservatives or flavors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span className="text-gray-700">Available for pickup or local delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProductReviews productId={id} />
        </div>
      </section>
    </div>
  );
}
