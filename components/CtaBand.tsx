import React from 'react';
import { PhoneCall, MapPin, Clock } from 'lucide-react';

interface CtaBandProps {
  onTestRideClick?: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onTestRideClick }) => {
  return (
    <section className="container-page py-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800 p-8 shadow-brand sm:p-12 lg:p-16">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-white/15 blur-[90px]" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-amber-300/20 blur-[90px]" />
        </div>

        <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-4">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              <span className="h-px w-6 bg-white/50" aria-hidden />
              Jawalakhel showroom
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] text-white">
              Ride one before you decide.
            </h2>
            <p className="text-[15px] leading-relaxed text-white/85">
              Both models are charged and waiting. Take one around the block, feel the torque off
              the line, and ask our team anything — no obligation to buy.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Jawalakhel, Lalitpur
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Sun–Fri, 9:00 AM – 6:30 PM
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
            <button
              onClick={onTestRideClick}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 active:scale-[0.98]"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Book a test ride</span>
            </button>
            <a
              href="tel:+9779705660297"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12"
            >
              <span className="tabular-nums">+977-9705660297</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
