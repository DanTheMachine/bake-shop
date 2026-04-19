'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  createdAt: string;
  product: { name: string };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-sm">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n}>{n <= rating ? '⭐' : '☆'}</span>
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    fetch('/api/admin/reviews')
      .then(r => r.json())
      .then(data => { setReviews(data); setLoading(false); });
  }, []);

  const update = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved } : r));
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.approved;
    if (filter === 'approved') return r.approved;
    return true;
  });

  const pendingCount = reviews.filter(r => !r.approved).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-charcoal">Customer Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">
            {pendingCount > 0 ? `${pendingCount} pending approval` : 'All reviews approved'}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(['pending', 'approved', 'all'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'pending' && pendingCount > 0 && (
              <span className="ml-1.5 bg-white text-primary-500 rounded-full px-1.5 py-0.5 text-xs font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">⭐</div>
          <p>No {filter === 'all' ? '' : filter} reviews.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sm text-neutral-charcoal">{r.authorName}</p>
                    <Stars rating={r.rating} />
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {r.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {r.product.name} · {formatDate(r.createdAt)}
                  </p>
                  {r.comment && <p className="text-sm text-gray-600">{r.comment}</p>}
                </div>

                <div className="flex gap-2 shrink-0">
                  {!r.approved ? (
                    <button
                      onClick={() => update(r.id, true)}
                      className="text-xs px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-medium transition-colors"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => update(r.id, false)}
                      className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                    >
                      Unapprove
                    </button>
                  )}
                  <button
                    onClick={() => remove(r.id)}
                    className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
