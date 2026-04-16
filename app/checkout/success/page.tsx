import Link from 'next/link';
import Header from '@/components/layout/header';

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
        </div>
      </section>
    </div>
  );
}
