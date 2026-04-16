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

export const metadata: Metadata = {
  title: "Rise By Amy — Purely Proofed",
  description: "Handcrafted cakes, pastries, and artisan baked goods made with love. Custom cakes for every occasion.",
  keywords: ["bakery", "custom cakes", "baked goods", "artisan", "pastries", "Rise By Amy"],
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
