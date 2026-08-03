import React from 'react';
import {
  BatteryCharging,
  Cpu,
  Disc3,
  Gauge,
  RotateCcw,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

interface Tech {
  icon: LucideIcon;
  title: string;
  desc: string;
  metric: string;
}

const TECH: Tech[] = [
  {
    icon: BatteryCharging,
    title: 'Graphene battery',
    desc: 'A 72V 32Ah graphene pack holds charge better in cold and heat, and lasts roughly three times longer than lead-acid.',
    metric: '90 km range',
  },
  {
    icon: Cpu,
    title: 'BLDC hub motor',
    desc: 'Brushless direct-drive motor rated at 1500W with a 3000W surge for loaded hill starts — quiet, with almost nothing to service.',
    metric: '3000W peak',
  },
  {
    icon: Gauge,
    title: 'TCS cruise control',
    desc: 'Traction control holds a steady speed on the highway and limits wheelspin on wet or gravel surfaces.',
    metric: '65 km/h top',
  },
  {
    icon: RotateCcw,
    title: 'Reverse gear',
    desc: 'Back out of tight parking spots without dragging 85 kg of scooter — a genuine difference in narrow Kathmandu lanes.',
    metric: 'One-touch',
  },
  {
    icon: Disc3,
    title: 'Dual disc brakes',
    desc: 'Discs front and rear with hydraulic telescopic forks and twin rear springs to absorb broken tarmac.',
    metric: 'Front + rear',
  },
  {
    icon: ShieldCheck,
    title: 'Authorized warranty',
    desc: 'One year of factory coverage, genuine spares and certified technicians at the Jawalakhel service centre.',
    metric: '1 year',
  },
];

export const TechSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-page-alt py-20 lg:py-28">
      <div
        className="absolute inset-0 -z-10 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
        aria-hidden
      />

      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Technology"
            align="center"
            title={
              <>
                Engineered for the way
                <br className="hidden sm:block" /> Nepal actually rides
              </>
            }
            description="Every model shares the same drivetrain and safety package — the difference is the body, not the hardware."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TECH.map(({ icon: Icon, title, desc, metric }, i) => (
            <Reveal key={title} delay={i * 70} as="article" className="h-full">
              <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                <div className="relative flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-line bg-page-alt px-3 py-1 text-[11px] font-semibold text-body tabular-nums">
                    {metric}
                  </span>
                </div>

                <div className="relative space-y-2">
                  <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
                  <p className="text-sm leading-relaxed text-body">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
