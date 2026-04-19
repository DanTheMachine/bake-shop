'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/header';

const CAKE_SIZES = [
  { value: '6-round', label: '6" Round — serves 8–10' },
  { value: '8-round', label: '8" Round — serves 12–16' },
  { value: '10-round', label: '10" Round — serves 20–25' },
  { value: 'half-sheet', label: 'Half Sheet — serves 24–30' },
  { value: 'full-sheet', label: 'Full Sheet — serves 48–60' },
  { value: 'tiered', label: 'Tiered / Multi-Tier — custom quote' },
];

const BUDGET_RANGES = [
  { value: 'under-100', label: 'Under $100' },
  { value: '100-200', label: '$100 – $200' },
  { value: '200-350', label: '$200 – $350' },
  { value: '350-500', label: '$350 – $500' },
  { value: '500-plus', label: '$500+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  cakeSize: string;
  flavors: string;
  designDescription: string;
  budget: string;
}

const initialForm: FormData = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  eventDate: '',
  cakeSize: '',
  flavors: '',
  designDescription: '',
  budget: '',
};

export default function CustomCakesPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateStr = minDate.toISOString().split('T')[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request');
      }

      router.push('/custom-cakes/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-50 via-primary-50 to-purple-50 py-16 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="text-6xl mb-4">🎂</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-charcoal mb-4">
            Custom Cake Orders
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your dream cake and we&apos;ll send you a personalized quote within 24–48 hours.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { step: '1', icon: '📝', title: 'Fill the form', desc: 'Share your vision, event date, and flavor ideas.' },
              { step: '2', icon: '💌', title: 'Get a quote', desc: 'We\'ll reach out within 24–48 hours with pricing.' },
              { step: '3', icon: '🎉', title: 'Pick up your cake', desc: 'Pay at pickup. Enjoy your perfect celebration cake!' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="card text-center">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="w-7 h-7 bg-primary-500 text-white rounded-full text-sm font-bold flex items-center justify-center mx-auto mb-2">
                  {step}
                </div>
                <h3 className="font-display font-semibold text-neutral-charcoal mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Contact */}
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Your Information</h2>
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

            {/* Event & Size */}
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Event Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="eventDate">
                    Event Date *
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    required
                    min={minDateStr}
                    value={form.eventDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">We need at least 7 days notice.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cakeSize">
                    Cake Size *
                  </label>
                  <select
                    id="cakeSize"
                    name="cakeSize"
                    required
                    value={form.cakeSize}
                    onChange={handleChange}
                    className="input-field bg-white"
                  >
                    <option value="">Select a size...</option>
                    {CAKE_SIZES.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Cake Details */}
            <div className="card">
              <h2 className="font-display text-xl font-semibold mb-4 text-neutral-charcoal">Cake Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="flavors">
                    Flavors *
                  </label>
                  <input
                    id="flavors"
                    name="flavors"
                    type="text"
                    required
                    value={form.flavors}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g. Vanilla cake, strawberry filling, buttercream frosting"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    List cake flavor, filling, and frosting. Multi-tier? Describe each layer.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="designDescription">
                    Design Description *
                  </label>
                  <textarea
                    id="designDescription"
                    name="designDescription"
                    rows={4}
                    required
                    value={form.designDescription}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Describe the look you're going for — colors, theme, decorations, any text on the cake, inspiration photos you have in mind, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="input-field bg-white"
                  >
                    <option value="">Prefer not to say</option>
                    {BUDGET_RANGES.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Optional — helps us tailor the quote to what works for you.</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
              <Link href="/shop" className="btn-outline text-center sm:w-auto px-8">
                Browse Ready-Made
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
