'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface Stats {
  totalOrders: number;
  activeOrders: number;
  revenue: number;
  pendingCustomRequests: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats);
  }, []);

  const statCards = stats
    ? [
        { label: 'Total Orders', value: stats.totalOrders, icon: '📦', href: '/admin/orders', color: 'bg-blue-50 text-blue-700' },
        { label: 'Active Orders', value: stats.activeOrders, icon: '⏳', href: '/admin/orders?status=RECEIVED', color: 'bg-yellow-50 text-yellow-700' },
        { label: 'Revenue', value: formatPrice(stats.revenue), icon: '💰', href: '/admin/orders', color: 'bg-green-50 text-green-700' },
        { label: 'Quote Requests', value: stats.pendingCustomRequests, icon: '🎂', href: '/admin/custom-requests', color: 'bg-primary-50 text-primary-700' },
      ]
    : [];

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-neutral-charcoal mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back! Here&apos;s what&apos;s happening.</p>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse h-28" />
            ))
          : statCards.map(({ label, value, icon, href, color }) => (
              <Link
                key={label}
                href={href}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-3 ${color}`}>
                  {icon}
                </div>
                <p className="text-2xl font-bold text-neutral-charcoal">{value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
              </Link>
            ))}
      </div>

      {/* Quick links */}
      <h2 className="font-display text-xl font-semibold text-neutral-charcoal mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/orders', icon: '📦', title: 'Manage Orders', desc: 'Update fulfillment status, view details' },
          { href: '/admin/custom-requests', icon: '🎂', title: 'Quote Requests', desc: 'Review and respond to custom cake orders' },
          { href: '/admin/products', icon: '🧁', title: 'Products', desc: 'Add, edit, or toggle product availability' },
        ].map(({ href, icon, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start gap-4"
          >
            <span className="text-3xl mt-0.5">{icon}</span>
            <div>
              <p className="font-semibold text-neutral-charcoal">{title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
