import Link from 'next/link';
import Header from '@/components/layout/header';
import { SOCIAL_LINKS } from '@/lib/social';

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-4">Order Placed!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. We&apos;ll be in touch shortly to confirm your pickup details.
          </p>
          {order && (
            <p className="text-sm text-gray-500 mb-8">
              Order number: <span className="font-semibold text-neutral-charcoal">{order}</span>
            </p>
          )}

          <div className="card text-left mb-8">
            <h2 className="font-display text-lg font-semibold mb-3 text-neutral-charcoal">What happens next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">1.</span>
                <span className="text-gray-700">You&apos;ll receive a confirmation email with your order details.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">2.</span>
                <span className="text-gray-700">We&apos;ll confirm your pickup time and any questions about your order.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">3.</span>
                <span className="text-gray-700">Your treats will be fresh-baked and ready on your pickup date!</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-primary">Keep Shopping</Link>
            <Link href="/" className="btn-outline">Back to Home</Link>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Tag us in your unboxing!</p>
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-500 hover:underline font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              {SOCIAL_LINKS.instagram.handle} on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
