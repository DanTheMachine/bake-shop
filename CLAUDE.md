# CLAUDE.md — Rise By Amy

## Project

Bakery e-commerce site ("Rise By Amy") built with Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma, and Supabase. See `llm_context.md` for full architecture and phase history.

## Dev Commands

```bash
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run test:ui      # Vitest unit/UI tests
npm run test:e2e     # Playwright E2E tests
npm test             # all tests
npx prisma db push   # apply schema changes
npx prisma studio    # browse database
```

## Design System

- **Colors:** pink (`#F9A8D4`), yellow (`#FDE68A`), mint (`#6EE7B7`) — Tailwind config in `tailwind.config.ts`
- **Fonts:** Baloo 2 (headings), Inter (body)
- **Component style:** rounded cards, soft pastel backgrounds, no harsh shadows

## Key Conventions

- All pages are in `app/` using the Next.js App Router. Server components by default; add `"use client"` only when needed.
- API routes live under `app/api/`.
- Shared UI components go in `components/ui/`, layout components in `components/layout/`.
- Database access goes through `lib/db.ts` (Prisma client singleton).
- Email sends go through `lib/email.ts` (Resend wrapper — no-ops if `RESEND_API_KEY` is unset).
- Cart state is client-side only, persisted in `localStorage` via `lib/cart-context.tsx`.
- Admin auth uses Supabase client-side session check in `app/admin/layout.tsx`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase Postgres connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (server only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend email API key (optional) |
| `NEXT_PUBLIC_BASE_URL` | Production domain (needed for OG image URLs) |

## Upcoming Work

- **Social media presence** — see `docs/social-media-plan.md` for the full phased plan (footer icons, share buttons, OG enhancements, Instagram feed, follow CTAs)

## Testing Notes

- Playwright uses placeholder Supabase env vars so E2E smoke tests boot without production credentials.
- Test artifacts (`coverage/`, `playwright-report/`, `test-results/`) are git-ignored.
