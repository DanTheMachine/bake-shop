import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProductGrid from '@/components/products/product-grid';
import ProductFilters from '@/components/products/product-filters';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our full selection of handcrafted cakes, pastries, seasonal treats, and gift boxes — ready for pickup.',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  let query = supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .order('created_at', { ascending: false });

  if (params.category) {
    query = query.eq('category', params.category.toUpperCase());
  }

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return <div>Error loading products</div>;
  }

  const { data: allProducts } = await supabase
    .from('products')
    .select('category')
    .eq('available', true);

  const categoryCounts = allProducts
    ? Object.entries(
        allProducts.reduce((acc: Record<string, number>, p: { category: string }) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {})
      ).map(([category, count]) => ({ category, _count: count }))
    : [];

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <section className="bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-5xl font-bold text-neutral-charcoal mb-4">Our Delicious Treats</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Purely Proofed — handcrafted with love, baked fresh daily.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ProductFilters categoryCounts={categoryCounts} currentCategory={params.category} />
            </aside>
            <main className="flex-1">
              <div className="mb-6">
                <p className="text-gray-600">{products?.length || 0} products found</p>
              </div>
              <ProductGrid products={products || []} />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
