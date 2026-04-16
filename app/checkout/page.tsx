'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/layout/header';

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  specialInstructions: string;
  paymentMethod: 'online' | 'cash';
}

const initialForm: FormData = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  pickupDate: '',
  specialInstructions: '',
  paymentMethod: 'cash',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-cream">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-display text-3xl font-bold mb-4">Nothing to check out</h1>
          <Link href="/shop" className="btn-primary">Browse Our Treats</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, total }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to place order');
      }

      const { orderNumber } = await res.json();
      clearCart();
      router.push(`/checkout/success?order=${orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  };

  // Minimum pickup date: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Left: form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <div className="card">
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerName">
                      Full Name *
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={form.customerName}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerEmail">
                      Email *
                    </label>
                    <input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      required
                      value={form.customerEmail}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerPhone">
                      Phone *
                    </label>
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      required
                      value={form.customerPhone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup */}
              <div className="card">
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Pickup Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pickupDate">
                    Requested Pickup Date *
                  </label>
                  <input
                    id="pickupDate"
                    name="pickupDate"
                    type="date"
                    required
                    min={minDate}
                    value={form.pickupDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">We will confirm your pickup time by email.</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="specialInstructions">
                    Special Instructions
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    rows={3}
                    value={form.specialInstructions}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Allergies, decorating notes, etc."
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="card">
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={form.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="text-primary-500"
                    />
                    <div>
                      <p className="font-semibold text-neutral-charcoal">Cash on Pickup</p>
                      <p className="text-sm text-gray-500">Pay when you pick up your order</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={form.paymentMethod === 'online'}
                      onChange={handleChange}
                      className="text-primary-500"
                    />
                    <div>
                      <p className="font-semibold text-neutral-charcoal">Pay Online (Stripe)</p>
                      <p className="text-sm text-gray-500">Secure credit/debit card payment</p>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Right: order summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm text-gray-600">
                      <span className="truncate pr-2">{item.productName} × {item.quantity}</span>
                      <span className="flex-shrink-0">{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-display font-bold text-xl text-neutral-charcoal">
                    <span>Total</span>
                    <span className="text-primary-500">{formatPrice(total)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
                <Link href="/cart" className="btn-outline w-full text-center block mt-3">
                  Back to Cart
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
