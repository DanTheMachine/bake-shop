import { supabase } from '@/lib/supabase';
import ProductGrid from '@/components/products/product-grid';
import ProductFilters from '@/components/products/product-filters';

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

  const categoryCounts = allProducts ? 
    Object.entries(
      allProducts.reduce((acc: any, p: any) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([category, count]) => ({ category, _count: count as number })) : [];

  console.log('Products:', products?.map(p => ({ id: p.id, name: p.name })));

  return (
    <div className="min-h-screen bg-neutral-cream">
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="font-display text-3xl font-bold text-primary-500">Sweet Delights Bakery</a>
            <div className="flex gap-6">
              <a href="/shop" className="text-primary-500 font-semibold">Shop</a>
              <a href="/custom-cakes" className="text-neutral-charcoal hover:text-primary-500 transition-colors font-medium">Custom Cakes</a>
              <a href="/about" className="text-neutral-charcoal hover:text-primary-500 transition-colors font-medium">About</a>
              <a href="/cart" className="text-neutral-charcoal hover:text-primary-500 transition-colors font-medium">Cart (0)</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-5xl font-bold text-neutral-charcoal mb-4">Our Delicious Treats</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handcrafted with love, baked fresh daily.</p>
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