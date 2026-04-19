'use client';

import { useEffect, useState, useCallback } from 'react';
import { formatPrice } from '@/lib/utils';

const CATEGORIES = ['READY_MADE', 'SEASONAL', 'GIFT_BOX', 'CUSTOM_CAKE'] as const;
type Category = typeof CATEGORIES[number];
const CATEGORY_LABELS: Record<Category, string> = {
  READY_MADE: 'Ready Made',
  SEASONAL: 'Seasonal',
  GIFT_BOX: 'Gift Box',
  CUSTOM_CAKE: 'Custom Cake',
};

interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  available: boolean;
}

const emptyForm = { name: '', description: '', category: 'READY_MADE' as Category, price: '', available: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await fetch('/api/admin/products').then(r => r.json());
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, category: p.category, price: p.price.toString(), available: p.available });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = { ...form, price: parseFloat(form.price) };

    if (editingId) {
      await fetch(`/api/admin/products/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setShowForm(false);
    await loadProducts();
    setSaving(false);
  };

  const toggleAvailability = async (p: Product) => {
    setToggling(p.id);
    await fetch(`/api/admin/products/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: !p.available }),
    });
    await loadProducts();
    setToggling(null);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    await loadProducts();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-neutral-charcoal">Products</h1>
        <button onClick={openAdd} className="btn-primary text-sm px-5 py-2.5">
          + Add Product
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 mb-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-neutral-charcoal">
            {editingId ? 'Edit Product' : 'New Product'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="input-field"
                placeholder="Chocolate Dream Cake"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="input-field resize-none"
                placeholder="Rich chocolate layers with ganache frosting..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                className="input-field bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="input-field"
                placeholder="24.99"
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="available"
                checked={form.available}
                onChange={e => setForm(f => ({ ...f, available: e.target.checked }))}
                className="w-4 h-4 text-primary-500 rounded"
              />
              <label htmlFor="available" className="text-sm font-medium text-gray-700">Available for purchase</label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-60">
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-20" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-neutral-charcoal text-sm">{p.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {CATEGORY_LABELS[p.category]}
                  </span>
                  {!p.available && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Hidden</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5 truncate">{p.description}</p>
              </div>
              <p className="font-bold text-neutral-charcoal shrink-0">{formatPrice(p.price)}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleAvailability(p)}
                  disabled={toggling === p.id}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    p.available
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {toggling === p.id ? '...' : p.available ? 'Available' : 'Hidden'}
                </button>
                <button
                  onClick={() => openEdit(p)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
