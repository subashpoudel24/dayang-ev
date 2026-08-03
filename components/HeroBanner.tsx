import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, Zap, Gauge, BatteryCharging } from 'lucide-react';
import { Button } from './Button';

interface HeroBannerProps {
  onExploreClick?: () => void;
  onTestRideClick?: () => void;
}

const HERO_STATS = [
  { icon: BatteryCharging, value: '90', unit: 'km', label: 'Range per charge' },
  { icon: Gauge, value: '65', unit: 'km/h', label: 'Top speed' },
  { icon: Zap, value: '3000', unit: 'W', label: 'Peak motor output' },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onTestRideClick }) => {
  return (
    <section className="relative -mt-18 pt-18 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-lines opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[64rem] rounded-full bg-brand-500/10 blur-[120px] animate-drift" />
        <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-amber-400/12 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-page to-transparent" />
      </div>

      <div className="container-page pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs shadow-card">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
              </span>
              <span className="text-body">Official Nepal showroom — Jawalakhel</span>
            </div>

            <h1 className="mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] font-bold text-ink">
              Graphene power,
              <br />
              <span className="text-gradient">built for Nepal.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base sm:text-[17px] leading-relaxed text-body">
              A 72V 32Ah graphene battery and a 3000W peak BLDC hub motor, with TCS cruise
              control, reverse gear and dual disc brakes — engineered for hills, potholes
              and everyday city traffic.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={onExploreClick}>
                <span>Explore the models</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="secondary" onClick={onTestRideClick}>
                <PhoneCall className="w-4 h-4" />
                <span>Book a test ride</span>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                1-year authorized warranty
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-600" />
                Under Rs. 25 per full charge
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-brand-600" />
                3.5 hr fast charge
              </span>
            </div>
          </div>

          {/* Product stage */}
          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div
              className="absolute inset-8 rounded-full bg-brand-500/12 blur-[70px]"
              aria-hidden
            />

            <div className="relative rounded-[1.75rem] border border-line bg-card overflow-hidden shadow-lift">
              <div className="relative aspect-[4/3.4] sm:aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dayang_v15.png"
                  alt="Dayang Viper SpaceX V15 electric scooter"
                  className="h-full w-full object-cover animate-float"
                />
                {/* Dark scrim so the caption stays legible over the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300">
                    Featured
                  </p>
                  <p className="mt-1 text-lg font-bold text-white leading-tight font-display">
                    Viper SpaceX V15
                  </p>
                  <p className="text-sm text-white/70 tabular-nums">Rs. 165,000</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-500/20 border border-emerald-300/40 px-3 py-1 text-[11px] font-semibold text-emerald-50 backdrop-blur-sm">
                  In stock
                </span>
              </div>
            </div>

            {/* Floating spec chip */}
            <div className="hidden lg:flex absolute -left-8 top-12 items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-lift animate-float [animation-delay:1.2s]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Zap className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink leading-none tabular-nums">3000W</p>
                <p className="text-[11px] text-muted mt-1">Peak BLDC output</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-line bg-card shadow-card divide-y sm:divide-y-0 sm:divide-x divide-line overflow-hidden">
          {HERO_STATS.map(({ icon: Icon, value, unit, label }) => (
            <div key={label} className="flex items-center gap-4 p-5 sm:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-ink leading-none tabular-nums">
                  {value}
                  <span className="ml-1 text-sm font-medium text-muted">{unit}</span>
                </p>
                <p className="mt-1.5 text-xs text-muted">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
