import Link from 'next/link';
import Header from '@/components/layout/header';

export default function CustomOrderSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <div className="text-8xl mb-6">🎂</div>
          <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-4">
            Request Received!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your custom cake request. We&apos;ll review your details and send you a personalized quote within 24–48 hours.
          </p>

          <div className="card text-left mb-8">
            <h2 className="font-display text-lg font-semibold mb-3 text-neutral-charcoal">What happens next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">1.</span>
                <span className="text-gray-700">We&apos;ll review your request and check availability for your event date.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">2.</span>
                <span className="text-gray-700">You&apos;ll receive a personalized quote by email within 24–48 hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">3.</span>
                <span className="text-gray-700">Once you accept the quote, we&apos;ll confirm your order and get baking!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-0.5">4.</span>
                <span className="text-gray-700">Pay cash at pickup — no payment needed upfront.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-primary">Browse Ready-Made Treats</Link>
            <Link href="/" className="btn-outline">Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
