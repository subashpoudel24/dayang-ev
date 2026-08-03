import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TestRideModal } from '../components/TestRideModal';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { CtaBand } from '../components/CtaBand';
import { INITIAL_SCOOTERS } from '../lib/seedData';
import {
  Check,
  Minus,
  PhoneCall,
  ArrowRight,
  Fuel,
  Wrench,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

interface Pillar {
  title: string;
  desc: string;
}

const PILLARS: Pillar[] = [
  {
    title: '72V 32Ah graphene battery',
    desc: 'Graphene chemistry delivers a 90 km rated range, roughly three times the cycle life of lead-acid, and steadier output in both cold mornings and Terai heat.',
  },
  {
    title: '3000W peak BLDC motor',
    desc: '1500W rated with a 3000W surge — instant torque from a standstill, near-silent running, and enough headroom to climb loaded with a pillion.',
  },
  {
    title: 'TCS, speed modes & reverse',
    desc: 'Traction-controlled cruise, selectable speed modes, a reverse gear for tight parking, and a built-in anti-theft alarm.',
  },
  {
    title: 'Dual disc brakes & hydraulics',
    desc: 'Discs front and rear, hydraulic telescopic forks up front and twin springs at the back — sized for broken tarmac, not showroom floors.',
  },
  {
    title: 'Under Rs. 25 per full charge',
    desc: 'About 2.3 kWh per charge. No petrol queues, no oil changes, and a fraction of the per-kilometre running cost.',
  },
  {
    title: '1-year authorized warranty',
    desc: 'Backed by Parimita Import Export Pvt. Ltd. in Jawalakhel, with genuine spare parts and certified service technicians.',
  },
];

const COMPARISON = [
  { feature: 'Battery', dayang: '72V 32Ah graphene', others: 'Lead-acid or basic Li-ion' },
  { feature: 'Range', dayang: '90 km rated', others: '45–60 km' },
  { feature: 'Motor', dayang: '1500W rated / 3000W peak', others: '800W–1000W' },
  { feature: 'Brakes', dayang: 'Front & rear disc', others: 'Single disc or drum' },
  { feature: 'Rider features', dayang: 'TCS cruise, reverse, alarm', others: 'Basic throttle only' },
  { feature: 'Suspension', dayang: 'Hydraulic front + dual rear', others: 'Single shock' },
  { feature: 'Support', dayang: 'Official distributor, Lalitpur', others: 'Third-party importers' },
];

interface CostRow {
  icon: LucideIcon;
  label: string;
  dayang: string;
  petrol: string;
}

const RUNNING_COSTS: CostRow[] = [
  { icon: Fuel, label: 'Fuel / charge for 90 km', dayang: 'Under Rs. 25', petrol: 'Rs. 300+' },
  { icon: Wrench, label: 'Routine servicing', dayang: 'No oil, no clutch', petrol: 'Every 2–3 months' },
  { icon: Leaf, label: 'Tailpipe emissions', dayang: 'None', petrol: 'CO₂ + particulates' },
];

export default function WhyDayang() {
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-page text-body">
      <Head>
        <title>Why Dayang EV — Graphene scooters in Nepal</title>
        <meta
          name="description"
          content="Why Dayang electric scooters make sense in Nepal: graphene battery, 3000W peak motor, dual disc brakes, and running costs under Rs. 25 per charge."
        />
      </Head>

      <Navbar onOpenTestRide={() => setIsTestRideOpen(true)} />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative -mt-18 overflow-hidden pt-18">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent)]" />
            <div className="absolute -top-32 left-1/4 h-[28rem] w-[40rem] rounded-full bg-brand-200/45 blur-[110px]" />
          </div>

          <div className="container-page py-20 lg:py-28">
            <div className="max-w-3xl animate-fade-up">
              <p className="eyebrow">
                <span className="h-px w-6 bg-brand-600/60" aria-hidden />
                Why Dayang
              </p>
              <h1 className="mt-5 text-[2.75rem] leading-[1.03] sm:text-6xl font-bold text-ink">
                Built different.
                <br />
                <span className="text-gradient">Priced right.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-body">
                Graphene battery technology, a genuinely powerful BLDC motor and rider features
                you would normally pay a lot more for — with a service centre in Lalitpur behind
                every sale.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => setIsTestRideOpen(true)}>
                  <PhoneCall className="h-4 w-4" />
                  <span>Book a test ride</span>
                </Button>
                <Button size="lg" variant="secondary" href="/">
                  <span>See the models</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="container-page py-20 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="The hardware"
              title="What sets Dayang apart"
              description="No trim-level games — every model ships with the same drivetrain, brakes and safety kit."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} as="article" className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20">
                  <span className="font-display text-sm font-bold text-brand-600/60 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-600/0 blur-3xl transition-all duration-500 group-hover:bg-brand-200/60"
                    aria-hidden
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Running cost vs petrol */}
        <section className="container-page py-12 lg:py-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] surface p-8 sm:p-10 lg:p-12">
              <div
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-200/40 blur-[90px]"
                aria-hidden
              />
              <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="space-y-4">
                  <p className="eyebrow">
                    <span className="h-px w-6 bg-brand-600/60" aria-hidden />
                    Running cost
                  </p>
                  <h2 className="font-display text-3xl font-bold leading-tight text-ink">
                    Roughly a tenth of what petrol costs you
                  </h2>
                  <p className="text-[15px] leading-relaxed text-body">
                    A 2.3 kWh charge takes you about 90 km. Cover the same distance on a
                    125cc petrol scooter and you are looking at well over Rs. 300 in fuel alone —
                    before servicing.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-line">
                  <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-line bg-page-alt px-4 py-3 text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-muted">Per 90 km</span>
                    <span className="text-brand-600">Dayang EV</span>
                    <span className="text-muted">Petrol</span>
                  </div>
                  {RUNNING_COSTS.map(({ icon: Icon, label, dayang, petrol }) => (
                    <div
                      key={label}
                      className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 border-b border-line px-4 py-3.5 text-sm last:border-b-0"
                    >
                      <span className="flex items-center gap-2 text-body">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted" />
                        <span className="text-xs sm:text-sm">{label}</span>
                      </span>
                      <span className="font-semibold text-ink">{dayang}</span>
                      <span className="text-muted">{petrol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Comparison */}
        <section className="container-page py-20 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Head to head"
              title="Dayang vs a standard e-scooter"
              description="The spec sheet most imported scooters in this price band cannot match."
            />
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <div className="overflow-x-auto rounded-3xl surface">
              <table className="w-full min-w-[36rem] text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em]">
                    <th className="px-6 py-4 text-left font-semibold text-muted">Feature</th>
                    <th className="px-6 py-4 text-left font-semibold text-brand-600">Dayang EV</th>
                    <th className="px-6 py-4 text-left font-semibold text-muted">
                      Typical alternative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-line transition-colors last:border-b-0 hover:bg-page-alt"
                    >
                      <td className="px-6 py-4 font-medium text-body">{row.feature}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2.5 text-ink">
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-50">
                            <Check className="h-2.5 w-2.5 text-brand-600" />
                          </span>
                          {row.dayang}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2.5 text-muted">
                          <Minus className="h-3 w-3 shrink-0 text-faint" />
                          {row.others}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <CtaBand onTestRideClick={() => setIsTestRideOpen(true)} />
        </Reveal>
      </main>

      <Footer />

      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        scooters={INITIAL_SCOOTERS}
      />
    </div>
  );
}
