# LLM Context

## Project Overview

- App: `Rise by Amy` bakery storefront built with Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma, and Supabase.
- Primary UI entry points: [app/page.tsx](/Users/danieltorres/projects/bake-shop/app/page.tsx), [app/shop/page.tsx](/Users/danieltorres/projects/bake-shop/app/shop/page.tsx), [app/cart/page.tsx](/Users/danieltorres/projects/bake-shop/app/cart/page.tsx), [components/layout/header.tsx](/Users/danieltorres/projects/bake-shop/components/layout/header.tsx).
- Cart state is client-side and persisted in `localStorage` via [lib/cart-context.tsx](/Users/danieltorres/projects/bake-shop/lib/cart-context.tsx).

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
- Workflow runs:
  - dependency install with `npm ci`
  - UI tests via Vitest
  - Playwright Chromium install
  - E2E smoke tests

## Test Coverage Today

- UI tests cover:
  - navbar branding and cart badge behavior
  - add-to-cart button interactions
- E2E tests cover:
  - homepage smoke render
  - cart page loading from seeded `localStorage`

## Notes

- Playwright uses placeholder Supabase env vars in config/CI so smoke tests can boot the app without production credentials.
- Generated test artifacts such as `coverage/`, `playwright-report/`, and `test-results/` are git-ignored.
