'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: string;
  name: string;
  price: number | string;
  available: boolean;
}

interface AddToCartButtonProps {
  product: Product;
  emoji?: string;
  className?: string;
  size?: 'sm' | 'lg';
}

export default function AddToCartButton({ product, emoji, className, size = 'lg' }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      unitPrice: Number(product.price),
      image: emoji,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const sizeClasses = size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';

  if (!product.available) {
    return (
      <button disabled className={`btn-primary opacity-50 cursor-not-allowed w-full ${sizeClasses} ${className ?? ''}`}>
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleAddToCart}
        className={`btn-primary w-full transition-all ${sizeClasses} ${added ? 'bg-green-500 border-green-500' : ''} ${className ?? ''}`}
      >
        {added ? 'Added!' : 'Add to Cart'}
      </button>
      {size === 'lg' && (
        <p className="text-sm text-gray-600 text-center">Free pickup · Local delivery available</p>
      )}
    </div>
  );
}
