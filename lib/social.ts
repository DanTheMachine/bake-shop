// Update handles here — all social links are sourced from this file.
export const SOCIAL_LINKS = {
  instagram: {
    handle: '@risebyamy',
    url: 'https://instagram.com/risebyamy',
    label: 'Instagram',
  },
  facebook: {
    handle: 'Rise By Amy',
    url: 'https://facebook.com/risebyamy',
    label: 'Facebook',
  },
  tiktok: {
    handle: '@risebyamy',
    url: 'https://tiktok.com/@risebyamy',
    label: 'TikTok',
  },
  pinterest: {
    handle: 'risebyamy',
    url: 'https://pinterest.com/risebyamy',
    label: 'Pinterest',
  },
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;
