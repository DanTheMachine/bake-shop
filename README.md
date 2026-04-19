# Rise by Amy — Bake Shop

A full-featured e-commerce platform for Rise by Amy, built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Supabase.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | Supabase Auth |
| Payments | Stripe |
| Email | Resend |
| Hosting | Vercel |

---

## Running the App

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (test mode is fine to start)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

You also need a `.env` file for Prisma CLI (it doesn't read `.env.local`):

```bash
# .env  (Prisma CLI only)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

See [Environment Variables](#environment-variables) below for the full reference.

### 3. Push the database schema

```bash
npx prisma db push
```

### 4. Start the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Useful commands

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run lint          # Run ESLint
npm run test:ui       # Run Vitest component tests
npm run test:e2e      # Run Playwright E2E tests
npm test              # Run both test suites
npx prisma studio     # Open database GUI in browser
npx prisma db push    # Push schema changes to database
```

---

## Admin Workflows

The admin section lives at `/admin`. There is no link to it from the public site — navigate there directly.

### Accessing the Admin

1. Go to `http://localhost:3000/admin/login`
2. Sign in with an email/password user created in your Supabase project under **Authentication → Users → Add user**

### Adding a Product

1. Go to `/admin/products`
2. Click **Add Product**
3. Fill in: name, description, category, price
4. Toggle **Available** on to make it visible in the shop
5. Save — the product appears in the shop immediately

Categories: `CUSTOM_CAKE`, `READY_MADE`, `SEASONAL`, `GIFT_BOX`

### Processing an Order

Orders come in two ways: Stripe (card payment) and cash on pickup.

**Stripe orders** are created as `PENDING` until Stripe confirms payment via webhook, then move to `PAID` automatically.

**Cash orders** are created immediately with status `CASH_ON_PICKUP`.

To process an order:

1. Go to `/admin/orders`
2. Click an order to expand its details
3. Use the **Fulfillment Status** dropdown to update progress:
   - `RECEIVED` → order received, not started
   - `PREPARING` → actively being baked/assembled
   - `READY` → ready for customer pickup
   - `COMPLETED` → picked up
   - `CANCELLED` → cancelled
4. Each status change automatically sends the customer a notification email

### Handling a Custom Cake Request

1. Go to `/admin/custom-requests`
2. Click a request to see the customer's details: event date, cake size, flavors, design notes, budget
3. Enter a quoted price and any notes
4. Update the status to `QUOTED`
5. Follow up with the customer directly (phone or email shown on the request)

Statuses: `PENDING` → `QUOTED` → `ACCEPTED` / `DECLINED`

### Moderating Reviews

Customer reviews are hidden until approved.

1. Go to `/admin/reviews`
2. Toggle **Approved** on to publish a review to the product page
3. Delete any spam or inappropriate submissions

---

## Customer Flows

### Browsing & Ordering

1. `/shop` — browse all products, filter by category
2. `/shop/[id]` — product detail, add to cart, read reviews
3. `/cart` — review cart, adjust quantities
4. `/checkout` — enter name, email, phone, pickup date, choose card or cash
5. `/checkout/success` — order confirmation with order number

### Custom Cake Request

1. `/custom-cakes` — fill out the request form (event date, size, flavors, design, budget)
2. Confirmation email sent automatically
3. Admin reviews and sends back a quote

### Order Lookup

Customers can check their order status at `/orders/lookup` using their email address — no account required.

---

## Environment Variables

### `.env.local` (Next.js + runtime)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend) — optional, emails are skipped silently if not set
RESEND_API_KEY="re_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL="your@email.com"
```

### `.env` (Prisma CLI only)

```env
DATABASE_URL="postgresql://[user]:[password]@[host]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://[user]:[password]@[host]:5432/postgres"
```

Both URLs come from Supabase under **Project Settings → Database → Connection string**.
Use port `6543` (pooled) for `DATABASE_URL` and port `5432` (direct) for `DIRECT_URL`.

### Setting up Stripe webhooks locally

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret it prints and set it as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## Routes Reference

### Public

| Route | Description |
|---|---|
| `/` | Homepage |
| `/shop` | Product grid with category filters |
| `/shop/[id]` | Product detail + reviews |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/checkout/success` | Order confirmation |
| `/custom-cakes` | Custom cake request form |
| `/custom-cakes/success` | Request confirmation |
| `/orders/lookup` | Order status lookup by email |
| `/about` | About the bakery |

### Admin

| Route | Description |
|---|---|
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Stats overview |
| `/admin/orders` | Order management |
| `/admin/custom-requests` | Custom cake quote requests |
| `/admin/products` | Product CRUD |
| `/admin/reviews` | Review moderation |

---

## Database Schema

| Model | Purpose |
|---|---|
| `Product` | Catalog items with price, category, availability |
| `Order` | Customer orders with payment + fulfillment status |
| `OrderItem` | Line items per order |
| `CustomOrderRequest` | Custom cake quote requests |
| `Review` | Customer reviews (moderated) |
| `NewsletterSubscriber` | Email list |

---

## Costs

| Service | Plan | Cost |
|---|---|---|
| Vercel | Hobby | Free |
| Supabase | Free tier | Free |
| Stripe | Pay-as-you-go | 2.9% + $0.30/transaction |
| Resend | Free tier | Free (3k emails/mo) |
| Domain | Annual | ~$12/year |
