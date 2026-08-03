import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, PhoneCall, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onOpenTestRide?: (scooterId?: string) => void;
}

const LINKS = [
  { href: '/', label: 'Models' },
  { href: '/why-dayang', label: 'Why Dayang' },
  { href: '/dealers', label: 'Dealers' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenTestRide }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The drawer overlays the page, so freeze the page behind it.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-line bg-page/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-18 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Dayang EV home"
          >
            <span className="relative flex items-center justify-center rounded-xl border border-line bg-card px-2.5 py-1.5 shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dayang_logo.png"
                alt=""
                className="h-6 w-auto object-contain"
              />
            </span>
            <span className="text-[15px] font-bold tracking-[0.14em] text-ink font-display">
              DAYANG <span className="text-brand-600">EV</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.href) ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-px bg-brand-600 transition-all duration-300 ${
                    isActive(link.href) ? 'w-5 opacity-100' : 'w-0 opacity-0'
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+9779705660297"
              className="text-sm text-muted hover:text-ink transition-colors tabular-nums"
            >
              +977-9705660297
            </a>
            <Button size="sm" onClick={() => onOpenTestRide?.()}>
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Test Ride</span>
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-body hover:text-ink transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden border-t border-line bg-page/97 backdrop-blur-xl transition-[max-height,opacity] duration-400 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-page py-5 space-y-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 text-[15px] text-body hover:text-ink border-b border-line-soft transition-colors"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-faint" />
            </Link>
          ))}
          <Button
            className="w-full mt-4"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTestRide?.();
            }}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book Test Ride</span>
          </Button>
          <a
            href="tel:+9779705660297"
            className="block text-center text-xs text-muted pt-2"
          >
            or call +977-9705660297
          </a>
        </div>
      </div>
    </header>
  );
};
