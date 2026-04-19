'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    setState(res.ok ? 'success' : 'error');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container mx-auto max-w-xl text-center">
        <div className="text-4xl mb-3">💌</div>
        <h2 className="font-display text-3xl font-bold text-neutral-charcoal mb-2">Stay in the Loop</h2>
        <p className="text-gray-600 mb-6">
          Get first dibs on seasonal specials, new flavors, and exclusive treats — straight to your inbox.
        </p>

        {state === 'success' ? (
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-2xl font-medium">
            <span>🎉</span> You&apos;re on the list!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input-field flex-1"
              disabled={state === 'loading'}
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:hover:scale-100"
            >
              {state === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {state === 'error' && (
          <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
        )}
        <p className="text-xs text-gray-400 mt-3">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
