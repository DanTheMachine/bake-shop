# Setup Instructions

Follow these steps to get your bakery e-commerce site up and running on your Windows machine.

## Step 1: Copy Files to Windows

1. Download/copy the entire `bake` folder to `c:\projects\bake`
2. Open your terminal (PowerShell or Command Prompt) and navigate there:
   ```bash
   cd c:\projects\bake
   ```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all the packages defined in `package.json`. It might take a few minutes.

## Step 3: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `artisan-bakery` (or whatever you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
5. Wait for project to be created (~2 minutes)
6. Once ready, go to **Settings** → **API**
7. Copy these values (you'll need them next):
   - Project URL
   - anon/public key
   - service_role key (click "Reveal" first)
8. Go to **Settings** → **Database** and copy:
   - Connection string (URI format)

## Step 4: Configure Environment Variables

1. In your project folder, copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Open `.env.local` in a text editor and fill in your Supabase values:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-REF].supabase.co:5432/postgres"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-REF].supabase.co:5432/postgres"
   
   NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
   SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-KEY]"
   ```

3. For now, you can leave the Stripe, Resend, and Cloudinary values empty (we'll set those up later)

## Step 5: Initialize the Database

```bash
# Generate Prisma Client
npx prisma generate

# Create the database tables
npx prisma db push
```

You should see output like:
```
✔ Generated Prisma Client
Your database is now in sync with your schema.
```

## Step 6: Run the Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

## Step 7: View Your Site

Open your browser and go to [http://localhost:3000](http://localhost:3000)

You should see the beautiful homepage with:
- Sweet Delights header
- Hero section with gradient background
- Features section
- Call-to-action section
- Footer

## Step 8: Verify Database (Optional)

Open Prisma Studio to see your database:

```bash
npx prisma studio
```

This opens a GUI at [http://localhost:5555](http://localhost:5555) where you can view/edit your database tables.

## Troubleshooting

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

### Database connection errors
- Double-check your `.env.local` file
- Make sure you replaced `[YOUR-PASSWORD]`, `[YOUR-REF]`, etc.
- Verify your Supabase project is running (check dashboard)

### Port 3000 already in use
- Stop other servers running on port 3000
- Or run on a different port: `npm run dev -- -p 3001`

### TypeScript errors
- Run `npx prisma generate` to regenerate the client
- Restart your editor/IDE

## Next Steps

Once everything is working:

1. **Customize the site**:
   - Update the bakery name in `app/page.tsx`
   - Change contact info in the footer
   - Update metadata in `app/layout.tsx`

2. **Add sample products** (via Prisma Studio):
   - Open Prisma Studio: `npx prisma studio`
   - Go to "Product" table
   - Click "Add record"
   - Fill in product details

3. **Start building Phase 2**:
   - Create the Shop page (`app/shop/page.tsx`)
   - Build product grid components
   - Implement filtering

Need help? Check the project plan document or ask for assistance!
