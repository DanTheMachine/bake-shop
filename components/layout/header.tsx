'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/custom-cakes', label: 'Custom Cakes' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <Image
              src="/images/logo-only-white-bg.png"
              alt="Rise by Amy bread logo"
              width={134}
              height={134}
              className="h-20 w-20 md:h-[8.4rem] md:w-[8.4rem] object-contain opacity-95"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
            <Image
              src="/images/text-only-white-bg-amy-primary-500.png"
              alt="Rise by Amy"
              width={672}
              height={202}
              className="h-14 md:h-[7.35rem] w-auto object-contain opacity-95"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-medium transition-colors ${
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'text-primary-500 font-semibold'
                    : 'text-neutral-charcoal hover:text-primary-500'
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
        </nav>
      </div>
    </header>
  );
}
