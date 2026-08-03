import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ScooterGallery } from '../../components/ScooterGallery';
import { ScooterSpecsTable } from '../../components/ScooterSpecsTable';
import { TestRideModal } from '../../components/TestRideModal';
import { ScooterCard } from '../../components/ScooterCard';
import { Reveal } from '../../components/Reveal';
import { Button } from '../../components/Button';
import { SectionHeading } from '../../components/SectionHeading';
import { Scooter } from '../../lib/types';
import { INITIAL_SCOOTERS } from '../../lib/seedData';
import {
  ArrowLeft,
  Star,
  Check,
  PhoneCall,
  Share2,
  BatteryCharging,
  Gauge,
  Zap,
  Timer,
} from 'lucide-react';

interface ScooterDetailPageProps {
  scooter: Scooter;
  allScooters: Scooter[];
}

export default function ScooterDetailPage({ scooter, allScooters }: ScooterDetailPageProps) {
  const [selectedColor, setSelectedColor] = useState(
    scooter?.colors?.[0] || { name: 'Standard', hex: '#e10600', code: 'red' }
  );
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!scooter) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-page p-6 text-center text-ink">
        <h1 className="font-display text-2xl font-bold">Model not found</h1>
        <Button href="/">Back to all models</Button>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Clipboard can be blocked; the URL is in the address bar either way.
    }
  };

  const saving = scooter.originalPrice ? scooter.originalPrice - scooter.price : 0;
  const related = (allScooters || []).filter((s) => s.id !== scooter.id);

  const quickSpecs = [
    { icon: BatteryCharging, label: 'Range', value: scooter.specs.range },
    { icon: Gauge, label: 'Top speed', value: scooter.specs.topSpeed },
    { icon: Zap, label: 'Motor', value: scooter.specs.motorPower.split(' ')[0] },
    { icon: Timer, label: 'Charge time', value: scooter.specs.chargingTime },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-page text-body">
      <Head>
        <title>{`${scooter.name} — Dayang EV Nepal`}</title>
        <meta
          name="description"
          content={`${scooter.name}: ${scooter.tagline}. Rs. ${scooter.price.toLocaleString()}, ${scooter.specs.range} range, ${scooter.specs.topSpeed} top speed.`}
        />
      </Head>

      <Navbar onOpenTestRide={() => setIsTestRideOpen(true)} />

      <main className="flex-grow">
        <div className="relative">
          <div
            className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(225_6_0/0.14),transparent)]"
            aria-hidden
          />

          <div className="container-page py-8 lg:py-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>All models</span>
              </Link>

              <button
                onClick={handleShare}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-page-alt px-3.5 py-1.5 text-xs text-body transition-colors hover:border-ink/20 hover:text-ink"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Product */}
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="animate-fade-up lg:sticky lg:top-24 lg:self-start">
                <ScooterGallery images={scooter.images} name={scooter.name} />
              </div>

              <div className="animate-fade-up space-y-7 [animation-delay:120ms]">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">
                      {scooter.category}
                    </span>
                    {scooter.badge && (
                      <span className="rounded-full border border-line bg-page-alt px-3 py-1 text-[11px] font-medium text-body">
                        {scooter.badge}
                      </span>
                    )}
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] text-ink">
                    {scooter.name}
                  </h1>
                  <p className="text-[15px] leading-relaxed text-body">{scooter.tagline}</p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-ink tabular-nums">
                        {scooter.rating}
                      </span>
                      <span className="tabular-nums">({scooter.reviewsCount} reviews)</span>
                    </span>
                    <span className="text-faint">·</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      In stock at Jawalakhel
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="relative overflow-hidden rounded-2xl surface p-6">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-200/50 blur-3xl"
                    aria-hidden
                  />
                  <p className="text-[11px] uppercase tracking-wider text-muted">
                    Retail price
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-3xl font-bold text-ink tabular-nums">
                      Rs. {scooter.price.toLocaleString()}
                    </span>
                    {scooter.originalPrice && (
                      <span className="text-sm text-muted line-through tabular-nums">
                        Rs. {scooter.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {saving > 0 && (
                      <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                        Save Rs. {saving.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    Includes the 72V charger, 1-year warranty, TCS cruise control and alarm system.
                  </p>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <p className="text-xs text-muted">
                    Colour: <span className="font-medium text-ink">{selectedColor.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scooter.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        aria-pressed={selectedColor.name === c.name}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                          selectedColor.name === c.name
                            ? 'border-brand-600 bg-brand-50 text-ink'
                            : 'border-line bg-page-alt text-body hover:border-ink/20 hover:text-ink'
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button size="lg" className="w-full" onClick={() => setIsTestRideOpen(true)}>
                    <PhoneCall className="h-4 w-4" />
                    <span>Book a test ride</span>
                  </Button>
                  <p className="text-center text-xs text-muted">
                    Authorized distributor · Jawalakhel, Lalitpur · Sun–Fri 9:00 AM – 6:30 PM
                  </p>
                </div>

                {/* Quick specs */}
                <div className="grid grid-cols-2 gap-3">
                  {quickSpecs.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-line bg-page-alt p-4 transition-colors hover:border-ink/20"
                    >
                      <Icon className="h-4 w-4 text-brand-600" />
                      <p className="mt-2.5 font-display text-lg font-bold text-ink tabular-nums">
                        {value}
                      </p>
                      <p className="text-[11px] uppercase tracking-wider text-muted">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="container-page py-16 lg:py-20">
          <Reveal>
            <div className="rounded-3xl surface p-6 sm:p-8 lg:p-10">
              <div className="space-y-2">
                <p className="eyebrow">
                  <span className="h-px w-6 bg-brand-600/60" aria-hidden />
                  Features
                </p>
                <h2 className="font-display text-2xl font-bold text-ink">What you get</h2>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-body">
                {scooter.description}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {scooter.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-line bg-page-alt p-4 transition-colors hover:border-ink/20"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50">
                      <Check className="h-3 w-3 text-brand-600" />
                    </span>
                    <span className="text-sm leading-snug text-body">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Specs */}
        <section className="container-page pb-16 lg:pb-20">
          <Reveal>
            <ScooterSpecsTable specs={scooter.specs} />
          </Reveal>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="container-page pb-20 lg:pb-24">
            <Reveal>
              <SectionHeading
                eyebrow="Also consider"
                title="The other model"
                description="Same drivetrain and safety package — a different body and riding position."
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-2">
              {related.map((s, i) => (
                <Reveal key={s._id || s.id} delay={i * 90} className="h-full">
                  <ScooterCard scooter={s} onTestRideClick={() => setIsTestRideOpen(true)} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        scooters={allScooters?.length ? allScooters : [scooter]}
        preselectedScooterId={scooter.id}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const host = context.req.headers.host || 'localhost:3000';

  try {
    const resSingle = await fetch(`${protocol}://${host}/api/scooters/${id}`);
    const dataSingle = await resSingle.json();

    const resAll = await fetch(`${protocol}://${host}/api/scooters`);
    const dataAll = await resAll.json();

    const scooter =
      dataSingle.data ||
      INITIAL_SCOOTERS.find((s) => s.id === id || s.slug === id) ||
      INITIAL_SCOOTERS[0];
    const allScooters = dataAll.data || INITIAL_SCOOTERS;

    return { props: { scooter, allScooters } };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    const scooter =
      INITIAL_SCOOTERS.find((s) => s.id === id || s.slug === id) || INITIAL_SCOOTERS[0];
    return { props: { scooter, allScooters: INITIAL_SCOOTERS } };
  }
};
