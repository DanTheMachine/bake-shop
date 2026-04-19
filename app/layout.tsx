import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Baloo_2 } from "next/font/google";
import { Cormorant_Upright } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorantUpright = Cormorant_Upright({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  weight: "400",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: 'Rise By Amy — Purely Proofed', template: '%s | Rise By Amy' },
  description: 'Handcrafted cakes, pastries, and artisan baked goods made with love. Custom cakes for every occasion.',
  keywords: ['bakery', 'custom cakes', 'baked goods', 'artisan', 'pastries', 'Rise By Amy'],
  openGraph: {
    type: 'website',
    siteName: 'Rise By Amy',
    title: 'Rise By Amy — Purely Proofed',
    description: 'Handcrafted cakes, pastries, and artisan baked goods made with love.',
    images: [{ url: '/images/logo-cropped.png', width: 400, height: 335, alt: 'Rise By Amy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rise By Amy — Purely Proofed',
    description: 'Handcrafted cakes, pastries, and artisan baked goods made with love.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable} ${cormorantUpright.variable} ${greatVibes.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
