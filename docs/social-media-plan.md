# Social Media Presence Plan — Rise By Amy

## Overview

Add social media integration across the site to grow Rise By Amy's audience, drive repeat traffic, and give customers easy ways to share and follow. Organized into four phases by effort and dependency order.

---

## Phase 1 — Footer Social Links (Low effort, high impact)

**Goal:** Every page has visible, clickable social media icons linking to Rise By Amy's profiles.

### Tasks

- Add social icon links (Instagram, Facebook, TikTok, Pinterest) to `components/layout/footer.tsx`
- Use SVG icons (e.g. from `react-icons` or inline SVGs) styled in the site's pink/yellow/mint theme
- Icons should open in a new tab with `rel="noopener noreferrer"`
- Make social icon URLs configurable via `lib/config.ts` (or `lib/social.ts`) so handles can be updated in one place

### Social Profiles to Link

| Platform  | Why                                  |
|-----------|--------------------------------------|
| Instagram | Visual platform — ideal for cake photos |
| Facebook  | Local community reach, event sharing |
| TikTok    | Short behind-the-scenes baking videos |
| Pinterest | Recipe/inspiration saves, long-tail discovery |

### Files to touch

- `components/layout/footer.tsx` — add icon row
- `lib/social.ts` (new) — export `SOCIAL_LINKS` config object
- `package.json` — add `react-icons` if not already present

---

## Phase 2 — Product & Page Share Buttons (Medium effort)

**Goal:** Let customers share specific products and the custom cakes page directly to social media or copy a link.

### Tasks

- Add a `<ShareButton>` component at `components/ui/share-button.tsx`
  - Uses the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) (`navigator.share`) when available
  - Falls back to copy-to-clipboard on unsupported browsers
- Place `<ShareButton>` on:
  - `app/shop/[id]/page.tsx` — individual product pages
  - `app/custom-cakes/page.tsx` — custom cake order form
- Optional: add direct "Share to Instagram Stories" deep link for mobile

### Files to touch

- `components/ui/share-button.tsx` (new)
- `app/shop/[id]/page.tsx`
- `app/custom-cakes/page.tsx`

---

## Phase 3 — Open Graph Enhancements (Medium effort)

**Goal:** When links are shared, they render rich, branded previews on every social platform.

### Current state

`app/layout.tsx` already sets root-level `openGraph` and `twitter` metadata. Product pages need per-page overrides.

### Tasks

- Add per-product OG metadata in `app/shop/[id]/page.tsx` using Next.js `generateMetadata`
  - `og:title` — product name
  - `og:description` — product description
  - `og:image` — product image URL (must be absolute; use `NEXT_PUBLIC_BASE_URL`)
  - `og:url` — canonical product URL
- Add OG metadata to `/custom-cakes` page
- Add OG metadata to `/about` page
- Create a default fallback OG image at `public/og-default.jpg` (1200×630px, branded)
- Verify with [Open Graph Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Files to touch

- `app/shop/[id]/page.tsx` — `generateMetadata` export
- `app/custom-cakes/layout.tsx` — add metadata
- `app/about/page.tsx` — add metadata
- `app/layout.tsx` — confirm `NEXT_PUBLIC_BASE_URL` is used for image URLs
- `public/og-default.jpg` (new asset)

### Environment variable needed

```
NEXT_PUBLIC_BASE_URL=https://risebyamy.com
```

---

## Phase 4 — Instagram Feed Integration (Higher effort, optional)

**Goal:** Show a live feed of recent Instagram posts on the homepage, replacing the current placeholder.

### Current state

Phase 7 added an Instagram feed placeholder on the homepage (`app/page.tsx`). It needs to be wired to real data.

### Approach options

| Option | Pros | Cons |
|--------|------|------|
| **Instagram Basic Display API** | Free, official | Requires OAuth app approval, token refresh |
| **Third-party embed (Elfsight, Behold, Curator)** | No-code, easy | Monthly cost ($0–$19/mo) |
| **Static curated grid** | Zero maintenance | Manual updates |

**Recommended:** Start with a static curated grid of 6–9 hand-picked images stored in `public/instagram/`. Swap for a live API feed once the Instagram Business account is established.

### Tasks (static approach)

- Replace the placeholder in `app/page.tsx` with a real `<InstagramGrid>` component
- Create `components/instagram-grid.tsx` — renders a 3-column responsive grid
- Each cell links to `https://instagram.com/risebyamy` (or the real handle)
- Add a "Follow us @risebyamy" CTA below the grid

### Tasks (live API approach, later)

- Register an Instagram Basic Display API app in Meta Developer Portal
- Create `app/api/instagram/route.ts` — fetches media with a long-lived token, caches with `next: { revalidate: 3600 }`
- Store `INSTAGRAM_ACCESS_TOKEN` in `.env.local` / Vercel environment variables
- Update `<InstagramGrid>` to fetch from `/api/instagram`

### Files to touch

- `components/instagram-grid.tsx` (new)
- `app/page.tsx` — replace placeholder
- `app/api/instagram/route.ts` (new, for live approach)
- `.env.local` — `INSTAGRAM_ACCESS_TOKEN` (for live approach)

---

## Phase 5 — Follow CTAs & Social Proof (Low effort)

**Goal:** Surface social following prompts at key conversion moments.

### Tasks

- Add a "Follow us on Instagram" banner/strip above the footer (or inside the newsletter section)
- Show follower count or a quote like "Join 2,000+ followers for daily baking inspiration"
- Add social links to the order confirmation page (`app/order-confirmation/page.tsx`) — "Share your order!" moment

### Files to touch

- `components/social-follow-strip.tsx` (new)
- `app/page.tsx` — insert `<SocialFollowStrip>` above `<NewsletterSignup>`
- `app/order-confirmation/page.tsx` — add share prompt

---

## Summary & Recommended Order

| Phase | Work | Effort | Priority |
|-------|------|--------|----------|
| 1 — Footer Social Links | Add icons to footer | ~1 hour | Do first |
| 2 — Share Buttons | Shareable product pages | ~2 hours | Do second |
| 3 — OG Enhancements | Rich social previews | ~2 hours | Do third |
| 5 — Follow CTAs | Banner + order confirmation | ~1 hour | Do fourth |
| 4 — Instagram Feed | Live/static grid | ~3–6 hours | Do last |

---

## Open Questions Before Implementation

1. What are the actual social media handles/URLs for Rise By Amy?
2. Is there an existing Instagram Business account, or does one need to be created?
3. Should the Instagram feed be static (curated images) or live (API)?
4. What is `NEXT_PUBLIC_BASE_URL` / the production domain?
