import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const MODEL_LINKS = [
  { href: '/scooters/dayang-viper-spacex-v15', label: 'Viper SpaceX V15' },
  { href: '/scooters/dayang-storm-x-es6', label: 'Storm-X ES6' },
  { href: '/why-dayang', label: 'Graphene battery tech' },
  { href: '/dealers', label: 'Find a dealer' },
];

const TECH_SPECS = [
  { label: 'Battery', value: '72V 32Ah Graphene' },
  { label: 'Motor', value: '1500W rated / 3000W peak' },
  { label: 'Range', value: '90 km per charge' },
  { label: 'Top speed', value: '65 km/h' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-24 border-t border-line bg-page-alt">
      <div className="container-page relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="rounded-xl border border-line bg-card px-2.5 py-1.5 shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dayang_logo.png"
                  alt=""
                  className="h-7 w-auto object-contain"
                />
              </span>
              <span className="font-display text-lg font-bold tracking-[0.14em] text-ink">
                DAYANG <span className="text-brand-600">EV</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-body">
              Official Dayang smart electric scooters for Nepal — 72V 32Ah graphene batteries,
              3000W peak BLDC hub motors, TCS cruise control and reverse gear.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-xs text-body shadow-card">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
              <span>Authorized distributor · Parimita Import Export Pvt. Ltd.</span>
            </div>
          </div>

          {/* Models */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Showcase
            </h4>
            <ul className="space-y-2.5 text-sm">
              {MODEL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-body transition-colors hover:text-brand-600"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Tech highlights
            </h4>
            <ul className="space-y-2.5 text-sm">
              {TECH_SPECS.map((spec) => (
                <li key={spec.label} className="text-body">
                  <span className="font-medium text-ink">{spec.label}:</span> {spec.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Showroom
            </h4>
            <ul className="space-y-3 text-sm text-body">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>
                  Jawalakhel, Lalitpur
                  <br />
                  Opposite Central Zoo Gate
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-600" />
                <a
                  href="tel:+9779705660297"
                  className="transition-colors hover:text-brand-600 tabular-nums"
                >
                  +977-9705660297
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-600" />
                <a
                  href="mailto:info@dayang-ev.com"
                  className="transition-colors hover:text-brand-600"
                >
                  info@dayang-ev.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-fade my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Dayang EV Motors & Parimita Import Export Pvt. Ltd.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Warranty
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
