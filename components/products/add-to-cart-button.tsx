'use client';

import { Button } from '@/components/ui/button';
import type { Product } from '@prisma/client';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleAddToCart}
        className="w-full"
        size="lg"
        disabled={!product.available}
      >
        {product.available ? 'Add to Cart' : 'Out of Stock'}
      </Button>
      
      {product.available && (
        <p className="text-sm text-gray-600 text-center">
          Free pickup • Local delivery available
        </p>
      )}
    </div>
  );
}
