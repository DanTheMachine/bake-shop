import { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddToCartButton from '@/components/products/add-to-cart-button';
import { CartProvider, useCart } from '@/lib/cart-context';

function CartCountProbe() {
  const { itemCount } = useCart();
  return <p data-testid="cart-count">{itemCount}</p>;
}

describe('AddToCartButton', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('adds an item to the cart and shows temporary feedback', async () => {
    render(
      <CartProvider>
        <AddToCartButton
          product={{ id: 'cake-1', name: 'Strawberry Cake', price: 24, available: true }}
          emoji="🍰"
        />
        <CartCountProbe />
      </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(screen.getByRole('button', { name: 'Added!' })).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
  });

  it('renders an unavailable product as disabled', () => {
    render(
      <CartProvider>
        <AddToCartButton
          product={{ id: 'cake-2', name: 'Chocolate Cake', price: 18, available: false }}
        />
      </CartProvider>
    );

    expect(screen.getByRole('button', { name: 'Out of Stock' })).toBeDisabled();
  });
});
