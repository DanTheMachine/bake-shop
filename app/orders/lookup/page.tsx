'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { formatPrice, formatDate } from '@/lib/utils';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  createdAt: string;
  fulfillmentStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  notes: string | null;
  items: OrderItem[];
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  READY: 'Ready for Pickup',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PREPARING: 'bg-blue-100 text-blue-700',
  READY: 'bg-green-100 text-green-700',
  COMPLETED: 'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrderLookupPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setOrders([]);

    const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email.trim())}`);
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
      setState('done');
    } else {
      setState('error');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-2 text-center">Track Your Order</h1>
          <p className="text-gray-500 text-center mb-10">Enter the email address you used to place your order.</p>

          <form onSubmit={handleSubmit} className="card flex gap-3 mb-8">
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
              className="btn-primary whitespace-nowrap disabled:opacity-60"
            >
              {state === 'loading' ? 'Looking up...' : 'Look Up'}
            </button>
          </form>

          {state === 'error' && (
            <p className="text-red-500 text-center text-sm mb-6">Something went wrong. Please try again.</p>
          )}

          {state === 'done' && orders.length === 0 && (
            <div className="card text-center py-10">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-500">No orders found for that email address.</p>
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
              {orders.map(order => (
                <div key={order.id} className="card">
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  >
                    <div>
                      <p className="font-semibold text-neutral-charcoal text-sm">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[order.fulfillmentStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                        {STATUS_LABELS[order.fulfillmentStatus] ?? order.fulfillmentStatus}
                      </span>
                      <span className="text-gray-400 text-sm">{expandedId === order.id ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {expandedId === order.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.productName} × {item.quantity}</span>
                            <span className="text-gray-600">{formatPrice(item.unitPrice * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t border-gray-100 pt-2">
                        <span>Total</span>
                        <span className="text-primary-500">{formatPrice(Number(order.totalAmount))}</span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>Payment: {order.paymentMethod === 'ONLINE' ? 'Card' : 'Cash on pickup'}</span>
                        <span>Status: {order.paymentStatus}</span>
                      </div>
                      {order.notes && (
                        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">Note: {order.notes}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center text-sm text-gray-400">
            Questions about your order?{' '}
            <Link href="/" className="text-primary-500 hover:underline">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
