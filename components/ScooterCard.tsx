import React from 'react';
import Link from 'next/link';
import { Scooter } from '../lib/types';
import { ArrowRight, Check, Star, BatteryCharging, Gauge, Zap } from 'lucide-react';

interface ScooterCardProps {
  scooter: Scooter;
  onTestRideClick?: (scooterId: string) => void;
}

export const ScooterCard: React.FC<ScooterCardProps> = ({ scooter, onTestRideClick }) => {
  const saving = scooter.originalPrice ? scooter.originalPrice - scooter.price : 0;

  const quickSpecs = [
    { icon: BatteryCharging, label: 'Range', value: scooter.specs.range },
    { icon: Gauge, label: 'Top speed', value: scooter.specs.topSpeed },
    { icon: Zap, label: 'Motor', value: scooter.specs.motorPower.split(' ')[0] },
  ];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift">
      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-page-alt">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scooter.images[0] || '/images/dayang_v15.png'}
          alt={scooter.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Dark scrim so the overlaid title stays legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {scooter.badge && (
            <span className="rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-white shadow-brand">
              {scooter.badge}
            </span>
          )}
          {saving > 0 && (
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/25 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              Save Rs. {saving.toLocaleString()}
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="tabular-nums">{scooter.rating}</span>
          <span className="text-white/60">({scooter.reviewsCount})</span>
        </div>

        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">
              {scooter.category}
            </p>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
              {scooter.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 pb-1" title="Available colors">
            {scooter.colors.map((c, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-white/60"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-grow flex-col gap-5 p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-body">{scooter.tagline}</p>

        <div className="grid grid-cols-3 gap-2.5">
          {quickSpecs.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-line bg-page-alt p-3 text-center transition-colors group-hover:border-brand-100"
            >
              <Icon className="mx-auto h-3.5 w-3.5 text-brand-600" />
              <p className="mt-2 text-sm font-bold text-ink tabular-nums">{value}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">{label}</p>
            </div>
          ))}
        </div>

        <ul className="space-y-2">
          {scooter.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-xs text-body">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-50">
                <Check className="h-2.5 w-2.5 text-brand-600" />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-4 pt-5 border-t border-line">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted">Retail price</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-ink tabular-nums">
                  Rs. {scooter.price.toLocaleString()}
                </span>
                {scooter.originalPrice && (
                  <span className="text-xs text-muted line-through tabular-nums">
                    {scooter.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onTestRideClick?.(scooter.id)}
              className="cursor-pointer rounded-full border border-line bg-card py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink/25 hover:bg-page-alt"
            >
              Test ride
            </button>
            <Link
              href={`/scooters/${scooter.slug || scooter.id}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-brand"
            >
              <span>View details</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
