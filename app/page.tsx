import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-neutral-charcoal leading-tight">
                Handcrafted with
                <span className="text-primary-500"> Love</span>,{" "}
                Baked to
                <span className="text-secondary-500"> Perfection</span>
              </h2>
              <p className="text-lg text-gray-600">
                Custom cakes, fresh pastries, and artisan baked goods made from scratch every day.
                Let us make your celebrations sweeter!
              </p>
              <div className="flex gap-4">
                <Link href="/shop" className="btn-primary">
                  Browse Our Treats
                </Link>
                <Link href="/custom-cakes" className="btn-outline">
                  Order Custom Cake
                </Link>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl shadow-playful flex items-center justify-center p-8">
              <Image
                src="/images/logo-cropped.png"
                alt="Rise By Amy — Purely Proofed"
                width={400}
                height={335}
                className="w-full h-full object-contain drop-shadow-xl"
                style={{ mixBlendMode: 'multiply' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="font-display text-4xl font-bold text-center mb-12 text-neutral-charcoal">
            Why Choose Us?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">🌾</div>
              <h4 className="font-display text-xl font-semibold mb-2">Fresh Ingredients</h4>
              <p className="text-gray-600">We use only the finest, locally-sourced ingredients in every recipe.</p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h4 className="font-display text-xl font-semibold mb-2">Custom Designs</h4>
              <p className="text-gray-600">Every cake is unique, designed exactly to your specifications.</p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">💝</div>
              <h4 className="font-display text-xl font-semibold mb-2">Made with Love</h4>
              <p className="text-gray-600">Each treat is handcrafted with care and attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-400 to-primary-500 text-white">
        <div className="container mx-auto text-center">
          <h3 className="font-display text-4xl font-bold mb-4">
            Ready to Order?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Browse our delicious selection or design your dream cake today!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="/custom-cakes"
              className="border-2 border-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </section>

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
