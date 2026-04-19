'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/custom-cakes', label: 'Custom Cakes' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo-only-white-bg.png"
              alt="Rise by Amy bread logo"
              width={134}
              height={134}
              className="h-14 w-14 md:h-[6rem] md:w-[6rem] object-contain opacity-95"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
            <Image
              src="/images/text-only-white-bg-amy-primary-500.png"
              alt="Rise by Amy"
              width={672}
              height={202}
              className="h-10 md:h-[5rem] w-auto object-contain opacity-95"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-medium transition-colors ${
                  isActive(href) ? 'text-primary-500 font-semibold' : 'text-neutral-charcoal hover:text-primary-500'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-neutral-charcoal hover:text-primary-500 font-medium transition-colors"
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/cart" className="relative text-neutral-charcoal hover:text-primary-500 transition-colors">
              <span className="text-sm font-medium">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="flex flex-col gap-1.5 p-1"
            >
              <span className={`block h-0.5 w-6 bg-neutral-charcoal transition-transform origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-neutral-charcoal transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-neutral-charcoal transition-transform origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-primary-100 py-3 mt-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-neutral-charcoal hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
