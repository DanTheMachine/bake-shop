import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Baloo_2 } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Artisan Bakery - Handcrafted Baked Goods",
  description: "Delicious handcrafted cakes, pastries, and baked goods made with love. Custom cakes for every occasion.",
  keywords: ["bakery", "custom cakes", "baked goods", "artisan", "pastries"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
