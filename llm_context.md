# LLM Context

## Project Overview

- App: `Rise by Amy` bakery storefront built with Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma, and Supabase.
- Primary UI entry points: [app/page.tsx](/Users/danieltorres/projects/bake-shop/app/page.tsx), [app/shop/page.tsx](/Users/danieltorres/projects/bake-shop/app/shop/page.tsx), [app/cart/page.tsx](/Users/danieltorres/projects/bake-shop/app/cart/page.tsx), [components/layout/header.tsx](/Users/danieltorres/projects/bake-shop/components/layout/header.tsx).
- Cart state is client-side and persisted in `localStorage` via [lib/cart-context.tsx](/Users/danieltorres/projects/bake-shop/lib/cart-context.tsx).

## All Phases Complete (7 of 7)

### Phase 1 & 2 — Foundation & Storefront
- Next.js 15, TypeScript, Tailwind CSS, Prisma, Supabase setup
- Design system: pink/yellow/mint theme, Baloo 2 + Inter fonts
- Homepage, shop page (`/shop`), product detail pages (`/shop/[id]`)
- Shopping cart with localStorage persistence (`CartContext`)
- Mobile-responsive header with hamburger menu

### Phase 3 — Checkout & Payments
- `/checkout` page: supports card (Stripe) and cash payment methods
- `/api/stripe/checkout` — creates Stripe Checkout Session, saves PENDING order
- `/api/stripe/webhook` — handles `checkout.session.completed` → PAID, `expired` → FAILED
- `/order-confirmation` — success page after checkout
- `lib/email.ts` — Resend transactional emails (fail-silently if `RESEND_API_KEY` not set)

### Phase 4 — Custom Orders
- `/custom-cakes` page — full form with event date, cake size, flavors, design notes, budget
- `/api/custom-orders` — saves to `customOrderRequest` table, sends customer + admin emails
- `app/custom-cakes/layout.tsx` — server component wrapper to export metadata from client page

### Phase 5 — Admin Dashboard
- `/admin/login` — Supabase Auth email/password
- `app/admin/layout.tsx` — client-side auth guard, sidebar nav
- `/admin/dashboard` — summary stats (orders, revenue, pending custom requests)
- `/admin/orders` — view/filter/update order fulfillment status
- `/admin/custom-requests` — view custom requests, submit quotes, track workflow
- `/admin/products` — full CRUD: add/edit/toggle availability/delete
- `/admin/reviews` — approve/unapprove/delete customer reviews

### Phase 6 — SEO & Polish
- `app/sitemap.ts` — dynamic sitemap with product URLs
- `app/robots.ts` — disallows /admin, /api/, /checkout, /cart
- `app/layout.tsx` — full OpenGraph + Twitter Card metadata
- `/about` page — bakery story

### Phase 7 — Community Features
- Customer reviews (`/shop/[id]` shows reviews below product via `<ProductReviews>`)
  - `components/products/product-reviews.tsx` — interactive star rating, submit form, review list
  - `app/api/reviews/route.ts` — GET approved reviews, POST new review (unapproved)
  - `app/api/admin/reviews/route.ts` — GET all reviews for admin
  - `app/api/admin/reviews/[id]/route.ts` — PATCH (approve toggle), DELETE
- Newsletter signup (`<NewsletterSignup>` on homepage)
  - `components/newsletter-signup.tsx` — email capture with idle/loading/success/error states
  - `app/api/newsletter/route.ts` — upsert subscriber
- Delivery zone checker (`<DeliveryZoneChecker>` on homepage)
  - `components/delivery-zone-checker.tsx` — ZIP code check against served area set
- Instagram feed placeholder on homepage
- Order lookup at `/orders/lookup` — enter email, see order history

## Database Schema Models

- `Product` — catalog with category, price, availability, requiresCustomForm
- `Order` + `OrderItem` — cart → checkout → fulfillment lifecycle
- `CustomOrderRequest` — quote workflow
- `Review` — productId, authorName, rating, comment, approved (default false)
- `NewsletterSubscriber` — email, unique constraint, upsert on subscribe
- `AdminUsers` — managed via Supabase Auth

**Required migration**: after pulling, run `npx prisma db push` to apply `Review` and `NewsletterSubscriber` models.

## Testing Setup

- UI tests use Vitest + Testing Library.
- E2E tests use Playwright with Chromium.
- Vitest config: [vitest.config.ts](/Users/danieltorres/projects/bake-shop/vitest.config.ts)
- Playwright config: [playwright.config.ts](/Users/danieltorres/projects/bake-shop/playwright.config.ts)
- Test files live under [tests/ui](/Users/danieltorres/projects/bake-shop/tests/ui) and [tests/e2e](/Users/danieltorres/projects/bake-shop/tests/e2e).

## Test Commands

```bash
npm run test:ui
npm run test:e2e
npm test
```

## CI

- GitHub Actions workflow: [.github/workflows/tests.yml](/Users/danieltorres/projects/bake-shop/.github/workflows/tests.yml)
- Workflow runs: dependency install → UI tests → Playwright Chromium → E2E smoke tests

## Test Coverage

- UI tests:
  - `tests/ui/header.test.tsx` — navbar branding, cart badge
  - `tests/ui/add-to-cart-button.test.tsx` — cart interactions
  - `tests/ui/product-reviews.test.tsx` — star rating, form submit, review display, error states
  - `tests/ui/newsletter-signup.test.tsx` — form submit, success/error states
- E2E tests:
  - `tests/e2e/home.spec.ts` — homepage smoke render
  - `tests/e2e/cart.spec.ts` — cart loading from seeded localStorage
  - `tests/e2e/custom-cakes.spec.ts` — form renders, native validation

## Upcoming Work

### Social Media Presence (Phase 8 — not yet started)

Full plan in [`docs/social-media-plan.md`](/Users/danieltorres/projects/bake-shop/docs/social-media-plan.md).

Phases in recommended order:
1. **Footer social links** — Instagram/Facebook/TikTok/Pinterest icons in footer; add `lib/social.ts` config
2. **Share buttons** — `<ShareButton>` component (Web Share API + clipboard fallback) on product and custom-cakes pages
3. **OG metadata enhancements** — per-product `generateMetadata` in `app/shop/[id]/page.tsx`; OG for `/custom-cakes` and `/about`; branded `public/og-default.jpg`
4. **Follow CTAs** — `<SocialFollowStrip>` above newsletter on homepage; share prompt on order confirmation page
5. **Instagram feed** — replace homepage placeholder with real grid; static curated images first, live API later

Key open questions before implementation: social handles/URLs, whether an Instagram Business account exists, and the production `NEXT_PUBLIC_BASE_URL`.

## Notes

- Playwright uses placeholder Supabase env vars in config/CI so smoke tests can boot the app without production credentials.
- Generated test artifacts such as `coverage/`, `playwright-report/`, and `test-results/` are git-ignored.
- `lib/email.ts` wraps Resend — all send functions are no-ops if `RESEND_API_KEY` is unset.
- Admin auth uses client-side `supabase.auth.getSession()` in `app/admin/layout.tsx`.
