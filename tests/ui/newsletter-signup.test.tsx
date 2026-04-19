import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterSignup from '@/components/newsletter-signup';

describe('NewsletterSignup', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders email input and subscribe button', () => {
    render(<NewsletterSignup />);
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('shows loading state during submission', async () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch;

    render(<NewsletterSignup />);
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /subscribing/i })).toBeInTheDocument();
    });
  });

  it('shows success message after subscribe', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }) as unknown as typeof fetch;

    render(<NewsletterSignup />);
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/You're on the list/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    }) as unknown as typeof fetch;

    render(<NewsletterSignup />);
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
