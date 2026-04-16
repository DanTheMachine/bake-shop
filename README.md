# Artisan Bakery E-Commerce Platform

A modern, full-featured e-commerce platform for selling artisan baked goods, built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Supabase.

## 🎯 Features

- ✅ Product catalog with categories (custom cakes, ready-made, seasonal, gift boxes)
- ✅ Shopping cart functionality
- ✅ Multiple ordering methods (buy now, pre-order, custom orders)
- ✅ Stripe payment integration
- ✅ Cash on pickup option
- ✅ Custom cake quote requests
- ✅ Admin dashboard for order and product management
- ✅ Email notifications (order confirmations, status updates)
- ✅ Responsive, playful design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier)
- Stripe account (test mode)

### 1. Install Dependencies

```bash
cd c:\projects\bake
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and API keys
3. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. Fill in your Supabase credentials in `.env.local`

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Run Tests

```bash
# UI/component tests
npm run test:ui

# End-to-end smoke tests
npm run test:e2e

# Run both suites
npm test
```

## 📁 Project Structure

```
bake/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   ├── prisma.ts          # Prisma client
│   ├── supabase.ts        # Supabase clients
│   └── utils.ts           # Helper functions
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── package.json           # Dependencies
```

## 🗄️ Database Schema

### Products
- Product catalog with images, pricing, categories
- Support for custom cake products

### Orders
- Complete order management
- Payment and fulfillment status tracking
- Customer information

### Order Items
- Line items for each order
- Custom cake details stored as JSON

### Custom Order Requests
- Quote request system
- Image uploads for reference
- Admin response workflow

### Admin Users
- Dashboard access control

## 🎨 Design System

### Color Palette
- **Primary**: Warm pink/coral (#FF6B9D)
- **Secondary**: Soft yellow/cream (#FFE5B4)
- **Accent**: Mint green (#A8E6CF), Lavender (#E1BEE7)
- **Neutrals**: Charcoal (#333), Warm white (#FFFBF5)

### Typography
- **Display Font**: Baloo 2 (headings)
- **Body Font**: Inter (text)

### Custom Classes
- `btn-primary` - Primary call-to-action button
- `btn-secondary` - Secondary button
- `btn-outline` - Outlined button
- `card` - Product/content card
- `input-field` - Form input styling

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL="your@email.com"
```

## 📋 Next Steps (Development Roadmap)

### Phase 2: Core Features (Current Phase)
- [ ] Create Shop page with product grid
- [ ] Build Product detail page
- [ ] Implement shopping cart (local storage)
- [ ] Set up Cloudinary for images

### Phase 3: Checkout & Payments
- [ ] Integrate Stripe checkout
- [ ] Build checkout flow
- [ ] Implement pickup date selection
- [ ] Add cash on pickup option

### Phase 4: Custom Orders
- [ ] Create custom cake order form
- [ ] Add image upload functionality
- [ ] Build quote request system

### Phase 5: Admin Dashboard
- [ ] Set up admin authentication
- [ ] Build dashboard overview
- [ ] Create order management interface
- [ ] Add product management (CRUD)

### Phase 6: Email & Polish
- [ ] Integrate Resend for emails
- [ ] Create email templates
- [ ] Mobile responsiveness
- [ ] SEO optimization

### Phase 7: Nice-to-Have (Post-Launch)
- [ ] Customer reviews/ratings
- [ ] Instagram feed integration
- [ ] Email marketing signup
- [ ] Customer accounts

## 🧪 Testing

- UI tests: Vitest + Testing Library
- E2E tests: Playwright + Chromium
- UI tests live in `tests/ui`
- E2E tests live in `tests/e2e`
- CI workflow: `.github/workflows/tests.yml`

The Playwright config uses placeholder Supabase environment values so smoke tests can boot the app in CI without production secrets.

## 🛠️ Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test:ui      # Run Vitest UI tests with coverage
npm run test:e2e     # Run Playwright E2E smoke tests
npm test             # Run both test suites
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma db push   # Push schema changes to database
```

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Email**: Resend
- **Images**: Cloudinary
- **Hosting**: Vercel

## 💰 Estimated Costs

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Hobby | $0 |
| Supabase | Free | $0 |
| Stripe | Pay-as-you-go | 2.9% + $0.30/txn |
| Cloudinary | Free | $0 |
| Resend | Free | $0 (3k emails/mo) |
| Domain | Annual | ~$12/year |

**Total Fixed Costs**: ~$1/month

## 🤝 Contributing

This is a private project. For questions or issues, contact the project owner.

## 📄 License

Private - All Rights Reserved

---

Built with ❤️ for Sweet Delights Bakery
