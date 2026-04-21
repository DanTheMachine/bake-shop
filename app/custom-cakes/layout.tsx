import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Cakes',
  description: 'Order a custom cake for your special occasion. Share your vision and we\'ll send a personalized quote within 24–48 hours.',
  openGraph: {
    title: 'Order a Custom Cake — Rise By Amy',
    description: 'Design your dream cake. Share your vision and we\'ll send a personalized quote within 24–48 hours.',
    url: '/custom-cakes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Order a Custom Cake — Rise By Amy',
    description: 'Design your dream cake. Share your vision and we\'ll send a personalized quote within 24–48 hours.',
  },
};

export default function CustomCakesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
