'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/layout/header';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-neutral-cream">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any treats yet!</p>
          <Link href="/shop" className="btn-primary">Browse Our Treats</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-cream">
      <Header />

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-neutral-charcoal mb-8">Your Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Item list */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="card flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0 text-3xl">
                    {item.image || '🧁'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-neutral-charcoal truncate">{item.productName}</h3>
                    <p className="text-primary-500 font-bold">{formatPrice(item.unitPrice)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-300 hover:text-primary-500 transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-300 hover:text-primary-500 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-neutral-charcoal">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
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
                  <p className="text-xs text-gray-500 mt-1">Pickup or local delivery</p>
                </div>

                <Link href="/checkout" className="btn-primary w-full text-center block">
                  Proceed to Checkout
                </Link>
                <Link href="/shop" className="btn-outline w-full text-center block mt-3">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
