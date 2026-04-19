'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatPrice, formatDate } from '@/lib/utils';

const FULFILLMENT_STATUSES = ['RECEIVED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'] as const;
type FulfillmentStatus = typeof FULFILLMENT_STATUSES[number];

const STATUS_LABELS: Record<FulfillmentStatus, string> = {
  RECEIVED: 'Received',
  PREPARING: 'Preparing',
  READY: 'Ready',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const STATUS_COLORS: Record<FulfillmentStatus, string> = {
  RECEIVED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-yellow-100 text-yellow-700',
  READY: 'bg-green-100 text-green-700',
  COMPLETED: 'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-100 text-red-600',
};

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string | null;
  totalAmount: number;
  paymentStatus: string;
  fulfillmentStatus: FulfillmentStatus;
  specialInstructions: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('status') ?? '');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const url = filter ? `/api/admin/orders?status=${filter}` : '/api/admin/orders';
    const data = await fetch(url).then(r => r.json());
    setOrders(data);
    setLoading(false);
  }, [filter]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const updateStatus = async (id: string, fulfillmentStatus: string) => {
    setUpdating(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fulfillmentStatus }),
    });
    await loadOrders();
    setUpdating(null);
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-neutral-charcoal mb-6">Orders</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ value: '', label: 'All' }, ...FULFILLMENT_STATUSES.map(s => ({ value: s, label: STATUS_LABELS[s] }))].map(
          ({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-20" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
          No orders found.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full text-left px-5 py-4 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-neutral-charcoal text-sm">{order.orderNumber}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.fulfillmentStatus]}`}>
                      {STATUS_LABELS[order.fulfillmentStatus]}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' :
                      order.paymentStatus === 'CASH_ON_PICKUP' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {order.paymentStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{order.customerName} · {order.customerEmail}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-neutral-charcoal">{formatPrice(order.totalAmount)}</p>
                  {order.pickupDate && (
                    <p className="text-xs text-gray-400 mt-0.5">Pickup: {formatDate(order.pickupDate)}</p>
                  )}
                </div>
                <span className="text-gray-400 text-sm ml-2">{expanded === order.id ? '▲' : '▼'}</span>
              </button>

              {/* Expanded detail */}
              {expanded === order.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                  {/* Items */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm text-gray-600">
                          <span>{item.productName} × {item.quantity}</span>
                          <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Customer</p>
                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    {order.specialInstructions && (
                      <p className="text-sm text-gray-600 mt-1 italic">&ldquo;{order.specialInstructions}&rdquo;</p>
                    )}
                  </div>

                  {/* Update status */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Update Status</p>
                    <div className="flex gap-2 flex-wrap">
                      {FULFILLMENT_STATUSES.map(s => (
                        <button
                          key={s}
                          disabled={order.fulfillmentStatus === s || updating === order.id}
                          onClick={() => updateStatus(order.id, s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                            order.fulfillmentStatus === s
                              ? STATUS_COLORS[s]
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {updating === order.id ? '...' : STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
