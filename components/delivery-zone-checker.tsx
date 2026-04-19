'use client';

import { useState } from 'react';

// Update this list with actual served zip codes
const SERVED_ZIPS = new Set([
  '90210', '90211', '90212', '90232', '90240', '90241', '90242',
  '90247', '90248', '90249', '90250', '90254', '90260', '90261',
]);

type CheckState = 'idle' | 'available' | 'unavailable';

export default function DeliveryZoneChecker() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<CheckState>('idle');

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(SERVED_ZIPS.has(zip.trim()) ? 'available' : 'unavailable');
  };

  return (
    <div className="card max-w-sm">
      <h3 className="font-display font-semibold text-neutral-charcoal mb-1">Check Delivery</h3>
      <p className="text-sm text-gray-500 mb-3">See if we deliver to your area.</p>
      <form onSubmit={check} className="flex gap-2">
        <input
          type="text"
          value={zip}
          onChange={e => { setZip(e.target.value); setResult('idle'); }}
          placeholder="ZIP code"
          maxLength={5}
          pattern="[0-9]{5}"
          required
          className="input-field flex-1 text-sm py-2"
        />
        <button type="submit" className="btn-primary text-sm px-4 py-2">Check</button>
      </form>
      {result === 'available' && (
        <p className="mt-2 text-sm text-green-600 font-medium">✓ We deliver to {zip}!</p>
      )}
      {result === 'unavailable' && (
        <p className="mt-2 text-sm text-gray-500">
          We don&apos;t deliver to {zip} yet, but you can still <strong>pick up</strong> your order.
        </p>
      )}
    </div>
  );
}
