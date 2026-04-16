# Quick Start Guide 🚀

## First Time Setup (5 minutes)

### 1. Install Everything
```bash
npm install
```

### 2. Set Up Supabase
- Go to https://supabase.com
- Create account → New Project
- Copy `.env.example` to `.env.local`
- Fill in your Supabase credentials

### 3. Create Database Tables
```bash
npx prisma db push
```

### 4. Add Sample Data (Optional)
```bash
npx prisma db seed
```

### 5. Run the Site!
```bash
npm run dev
```

Open http://localhost:3000 🎉

### 6. Run the Tests
```bash
npm run test:ui
npm run test:e2e
```

## Daily Development

```bash
npm run dev              # Start server
npm run test:ui          # UI/component tests
npm run test:e2e         # End-to-end smoke tests
npx prisma studio        # View database
npx prisma db push       # Update database schema
```

## What You Have Now

✅ **Homepage** - Beautiful landing page with hero section  
✅ **Database** - 5 tables (Products, Orders, OrderItems, CustomOrderRequests, AdminUsers)  
✅ **Components** - Button, Card, Input ready to use  
✅ **Styling** - Tailwind + playful color palette configured  
✅ **Types** - Full TypeScript support  
✅ **Sample Data** - 8 products ready to display  
✅ **Tests** - Vitest UI tests + Playwright smoke tests  

## Next: Build the Shop Page

Create `app/shop/page.tsx`:
```typescript
import { prisma } from '@/lib/prisma';

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { available: true }
  });
  
  return (
    <div>
      <h1>Shop Our Delights</h1>
      {/* Product grid here */}
    </div>
  );
}
```

Need help? Check `README.md`, `SETUP.md`, or `llm_context.md` for more detail.
