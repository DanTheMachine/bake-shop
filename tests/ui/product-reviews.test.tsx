import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductReviews from '@/components/products/product-reviews';

const mockReviews = [
  { id: '1', authorName: 'Jane S.', rating: 5, comment: 'Absolutely delicious!', createdAt: '2026-01-10T10:00:00Z' },
  { id: '2', authorName: 'Bob M.', rating: 4, comment: null, createdAt: '2026-01-12T10:00:00Z' },
];

describe('ProductReviews', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading skeletons initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch;
    render(<ProductReviews productId="prod-1" />);
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('renders approved reviews', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockReviews,
    }) as unknown as typeof fetch;

    render(<ProductReviews productId="prod-1" />);

    await waitFor(() => {
      expect(screen.getByText('Jane S.')).toBeInTheDocument();
      expect(screen.getByText('Absolutely delicious!')).toBeInTheDocument();
      expect(screen.getByText('Bob M.')).toBeInTheDocument();
    });
  });

  it('shows "no reviews" when list is empty', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as unknown as typeof fetch;

    render(<ProductReviews productId="prod-1" />);

    await waitFor(() => {
      expect(screen.getByText(/No reviews yet/i)).toBeInTheDocument();
    });
  });

  it('shows average rating when reviews exist', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockReviews,
    }) as unknown as typeof fetch;

    render(<ProductReviews productId="prod-1" />);

    await waitFor(() => {
      expect(screen.getByText(/4\.5/)).toBeInTheDocument();
      expect(screen.getByText(/2 reviews/)).toBeInTheDocument();
    });
  });

  it('toggles review form on button click', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as unknown as typeof fetch;

    render(<ProductReviews productId="prod-1" />);

    await waitFor(() => screen.getByText('Write a Review'));

    fireEvent.click(screen.getByText('Write a Review'));
    expect(screen.getByText('Your Review')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Your Review')).not.toBeInTheDocument();
  });

  it('shows validation error when submitting without rating', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as unknown as typeof fetch;

    render(<ProductReviews productId="prod-1" />);
    await waitFor(() => screen.getByText('Write a Review'));
    fireEvent.click(screen.getByText('Write a Review'));

    const nameInput = screen.getByPlaceholderText('Jane S.');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.submit(screen.getByRole('form') ?? document.querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByText(/Please select a star rating/i)).toBeInTheDocument();
    });
  });

  it('shows pending approval message on successful submit', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) as unknown as typeof fetch;

    render(<ProductReviews productId="prod-1" />);
    await waitFor(() => screen.getByText('Write a Review'));
    fireEvent.click(screen.getByText('Write a Review'));

    fireEvent.click(screen.getByLabelText('Rate 4 stars'));
    fireEvent.change(screen.getByPlaceholderText('Jane S.'), { target: { value: 'Test User' } });
    fireEvent.click(screen.getByText('Submit Review'));

    await waitFor(() => {
      expect(screen.getByText(/Thanks for your review/i)).toBeInTheDocument();
    });
  });
});
