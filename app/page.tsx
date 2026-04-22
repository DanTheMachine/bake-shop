import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NewsletterSignup from "@/components/newsletter-signup";
import DeliveryZoneChecker from "@/components/delivery-zone-checker";
import InstagramGrid from "@/components/instagram-grid";
import SocialFollowStrip from "@/components/social-follow-strip";

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

      {/* Delivery Zone + Newsletter */}
      <section className="py-16 px-4 bg-neutral-cream">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
            <div>
              <h3 className="font-display text-2xl font-bold text-neutral-charcoal mb-4">Do We Deliver to You?</h3>
              <DeliveryZoneChecker />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-neutral-charcoal mb-2">Follow Along</h3>
              <p className="text-gray-500 text-sm mb-4">Check out our latest creations on Instagram.</p>
              <InstagramGrid />
            </div>
          </div>
        </div>
      </section>

      <SocialFollowStrip />

      <NewsletterSignup />

      <Footer />
    </div>
  );
}
