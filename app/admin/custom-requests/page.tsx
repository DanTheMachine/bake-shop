'use client';

import { useEffect, useState, useCallback } from 'react';
import { formatDate, formatPrice } from '@/lib/utils';

const STATUSES = ['PENDING', 'QUOTED', 'ACCEPTED', 'DECLINED'] as const;
type RequestStatus = typeof STATUSES[number];

const STATUS_COLORS: Record<RequestStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  QUOTED: 'bg-blue-100 text-blue-700',
  ACCEPTED: 'bg-green-100 text-green-700',
  DECLINED: 'bg-red-100 text-red-600',
};

interface CustomRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  cakeSize: string;
  flavors: string;
  designDescription: string;
  budget: string | null;
  status: RequestStatus;
  quotedPrice: number | null;
  adminNotes: string | null;
  createdAt: string;
}

export default function CustomRequestsPage() {
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    const url = filter ? `/api/admin/custom-requests?status=${filter}` : '/api/admin/custom-requests';
    const data = await fetch(url).then(r => r.json());
    setRequests(data);
    setLoading(false);
  }, [filter]);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  const openEdit = (req: CustomRequest) => {
    setEditing(req.id);
    setQuotePrice(req.quotedPrice?.toString() ?? '');
    setNotes(req.adminNotes ?? '');
  };

  const saveQuote = async (id: string, status: string) => {
    setSaving(true);
    await fetch(`/api/admin/custom-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        quotedPrice: quotePrice ? parseFloat(quotePrice) : undefined,
        adminNotes: notes,
      }),
    });
    setEditing(null);
    await loadRequests();
    setSaving(false);
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-neutral-charcoal mb-6">Custom Cake Requests</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ value: '', label: 'All' }, ...STATUSES.map(s => ({ value: s, label: s.charAt(0) + s.slice(1).toLowerCase() }))].map(
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
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-20" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400">No requests found.</div>
      ) : (
        <div className="space-y-3">
          {requests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === req.id ? null : req.id)}
                className="w-full text-left px-5 py-4 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-neutral-charcoal text-sm">{req.customerName}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[req.status]}`}>
                      {req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                    </span>
                    {req.quotedPrice && (
                      <span className="text-xs text-green-600 font-medium">Quote: {formatPrice(req.quotedPrice)}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">
                    {req.cakeSize} · Event: {formatDate(req.eventDate)}
                  </p>
                </div>
                <div className="text-right shrink-0 text-xs text-gray-400">
                  {formatDate(req.createdAt)}
                </div>
                <span className="text-gray-400 text-sm ml-2">{expanded === req.id ? '▲' : '▼'}</span>
              </button>

              {/* Detail */}
              {expanded === req.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Contact</p>
                      <p className="text-gray-700">{req.customerEmail}</p>
                      <p className="text-gray-700">{req.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Cake Details</p>
                      <p className="text-gray-700"><span className="font-medium">Size:</span> {req.cakeSize}</p>
                      <p className="text-gray-700"><span className="font-medium">Flavors:</span> {req.flavors}</p>
                      {req.budget && <p className="text-gray-700"><span className="font-medium">Budget:</span> {req.budget}</p>}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Design Description</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{req.designDescription}</p>
                  </div>
                  {req.adminNotes && editing !== req.id && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Notes</p>
                      <p className="text-sm text-gray-600 italic">{req.adminNotes}</p>
                    </div>
                  )}

                  {editing === req.id ? (
                    <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Send Quote</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Quoted Price ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={quotePrice}
                            onChange={e => setQuotePrice(e.target.value)}
                            className="input-field text-sm"
                            placeholder="e.g. 175.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Internal Notes</label>
                          <input
                            type="text"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="input-field text-sm"
                            placeholder="Optional notes..."
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => saveQuote(req.id, 'QUOTED')}
                          disabled={saving}
                          className="btn-primary text-sm px-4 py-2 disabled:opacity-60"
                        >
                          Mark as Quoted
                        </button>
                        <button
                          onClick={() => saveQuote(req.id, 'ACCEPTED')}
                          disabled={saving}
                          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-60"
                        >
                          Mark Accepted
                        </button>
                        <button
                          onClick={() => saveQuote(req.id, 'DECLINED')}
                          disabled={saving}
                          className="bg-red-100 hover:bg-red-200 text-red-700 text-sm px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-60"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => openEdit(req)}
                      className="btn-outline text-sm px-4 py-2"
                    >
                      Update / Send Quote
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
