# Rise by Amy — Project Summary

## All 7 Phases Complete ✅

A full-stack e-commerce bakery site built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Supabase.

---

## Tech Stack

- **Frontend**: Next.js 15 App Router, TypeScript, Tailwind CSS
- **Database**: Supabase PostgreSQL via Prisma ORM
- **Payments**: Stripe Checkout (hosted)
- **Email**: Resend (fail-silent when key not set)
- **Auth**: Supabase Auth (admin dashboard)
- **Testing**: Vitest + Testing Library, Playwright
- **CI**: GitHub Actions

---

## File Tree (key files)

```
bake-shop/
├── app/
│   ├── page.tsx                        # Homepage with newsletter + delivery zone
│   ├── layout.tsx                      # Root layout, OG metadata
│   ├── sitemap.ts                      # Dynamic product sitemap
│   ├── robots.ts                       # Robots.txt rules
│   ├── shop/
│   │   ├── page.tsx                    # Product grid
│   │   └── [id]/page.tsx              # Product detail + reviews
│   ├── cart/page.tsx                   # Cart page
│   ├── checkout/page.tsx               # Checkout (card/cash)
│   ├── order-confirmation/page.tsx     # Post-checkout success
│   ├── orders/lookup/page.tsx          # Order lookup by email
│   ├── custom-cakes/
│   │   ├── layout.tsx                  # Metadata wrapper
│   │   └── page.tsx                   # Custom order form
│   ├── about/page.tsx                  # Bakery story
│   ├── admin/
│   │   ├── layout.tsx                  # Auth guard + sidebar
│   │   ├── login/page.tsx              # Admin login
│   │   ├── dashboard/page.tsx          # Stats overview
│   │   ├── orders/page.tsx             # Order management
│   │   ├── custom-requests/page.tsx    # Quote workflow
│   │   ├── products/page.tsx           # Product CRUD
│   │   └── reviews/page.tsx            # Review moderation
│   └── api/
│       ├── stripe/
│       │   ├── checkout/route.ts       # Create Stripe session
│       │   └── webhook/route.ts        # Handle payment events
│       ├── orders/
│       │   ├── route.ts                # Create cash order
│       │   └── lookup/route.ts         # Lookup by email
│       ├── custom-orders/route.ts
│       ├── reviews/route.ts
│       ├── newsletter/route.ts
│       └── admin/
│           ├── orders/[id]/route.ts
│           ├── custom-requests/[id]/route.ts
│           ├── products/route.ts
│           ├── products/[id]/route.ts
│           ├── reviews/route.ts
│           └── reviews/[id]/route.ts
├── components/
│   ├── layout/
│   │   └── header.tsx                  # Responsive with hamburger
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── add-to-cart-button.tsx
│   │   └── product-reviews.tsx         # Star rating + review form
│   ├── newsletter-signup.tsx
│   └── delivery-zone-checker.tsx
├── lib/
│   ├── cart-context.tsx
│   ├── email.ts                        # Resend wrappers
│   ├── prisma.ts
│   ├── supabase.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma                   # 6 models including Review, NewsletterSubscriber
└── tests/
    ├── ui/
    │   ├── header.test.tsx
    │   ├── add-to-cart-button.test.tsx
    │   ├── product-reviews.test.tsx
    │   └── newsletter-signup.test.tsx
    └── e2e/
        ├── home.spec.ts
        ├── cart.spec.ts
        └── custom-cakes.spec.ts
```

---

## Environment Variables Required

```bash
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=           # optional — emails silently skip if unset
ADMIN_EMAIL=
APP_URL=http://localhost:3000
```

---

## Getting Started

```bash
npm install
npx prisma db push        # apply schema (run after each schema change)
npx prisma db seed        # add 8 sample products
npm run dev
```

Admin dashboard: `/admin/login` — create a user in Supabase Auth dashboard.

---

## Costs

- Hosting (Vercel): Free
- Database (Supabase): Free (500MB)
- Email (Resend): Free (3k/mo)
- Stripe: 2.9% + $0.30 per transaction
