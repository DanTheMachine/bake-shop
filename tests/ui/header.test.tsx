import type { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '@/components/layout/header';
import { CartProvider } from '@/lib/cart-context';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/shop',
}));

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the logo artwork and highlights the active nav link', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );

    expect(screen.getByAltText('Rise by Amy bread logo')).toBeInTheDocument();
    expect(screen.getByAltText('Rise by Amy')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveClass('text-primary-500');
  });

  it('shows the persisted cart count badge', async () => {
    localStorage.setItem(
      'sweet-delights-cart',
      JSON.stringify([
        {
          productId: 'croissant',
          productName: 'Butter Croissant',
          quantity: 2,
          unitPrice: 6,
        },
      ])
    );

    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    });
  });
});
