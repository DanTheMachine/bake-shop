import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/header';
import NewsletterSignup from '@/components/newsletter-signup';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Rise by Amy — handcrafted baked goods made with love in every batch.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50 py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="text-6xl mb-4">🧁</div>
          <h1 className="font-display text-5xl font-bold text-neutral-charcoal mb-4">About Rise by Amy</h1>
          <p className="text-lg text-gray-600">Purely Proofed — handcrafted baked goods made with love in every batch.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="card space-y-5 text-gray-600 leading-relaxed">
            <h2 className="font-display text-3xl font-bold text-neutral-charcoal">Our Story</h2>
            <p>
              Rise by Amy started the way most great things do — at home, with flour on the counter and something
              sweet in the oven. What began as weekend baking for family and friends quickly grew into a small
              business fueled by community love and the belief that everyone deserves a truly great baked good.
            </p>
            <p>
              Every item is made from scratch using quality ingredients. No shortcuts, no preservatives — just
              honest baking done the right way. From birthday cakes to fresh sourdough, each order gets the same
              care and attention whether it's your first or your fiftieth.
            </p>
            <p>
              We're a small operation and proud of it. That means you're always getting something made by hand,
              not a factory.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-neutral-charcoal text-center mb-10">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌾', title: 'Quality Ingredients', desc: 'We source the best ingredients we can find — real butter, fresh eggs, and flour you can trust.' },
              { icon: '🤝', title: 'Community First', desc: 'Rise by Amy was built on word of mouth and neighbor recommendations. That community matters to us.' },
              { icon: '🎂', title: 'Made to Order', desc: 'Nothing sits on a shelf waiting. Your order is baked fresh for you.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card text-center">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-400 to-primary-500 text-white">
        <div className="container mx-auto text-center max-w-xl">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Taste the Difference?</h2>
          <p className="mb-8 opacity-90">Browse the shop or reach out for a custom order.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105">
              Shop Now
            </Link>
            <Link href="/custom-cakes" className="border-2 border-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-2xl transition-all duration-200">
              Custom Order
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      {/* Footer */}
      <footer className="bg-neutral-charcoal text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display text-2xl font-bold mb-4 text-primary-400">Rise By Amy</h4>
              <p className="text-gray-400">Purely Proofed. Handcrafted baked goods made with love.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2">
                <Link href="/shop" className="block text-gray-400 hover:text-primary-400 transition-colors">Shop</Link>
                <Link href="/custom-cakes" className="block text-gray-400 hover:text-primary-400 transition-colors">Custom Cakes</Link>
                <Link href="/about" className="block text-gray-400 hover:text-primary-400 transition-colors">About</Link>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-gray-400">
                <p>📍 123 Baker Street</p>
                <p>📞 (555) 123-4567</p>
                <p>✉️ hello@sweetdelights.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Rise By Amy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
