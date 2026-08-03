import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TestRideModal } from '../components/TestRideModal';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { INITIAL_SCOOTERS } from '../lib/seedData';
import { MapPin, Phone, Clock, Search, Navigation, PhoneCall, X, Star } from 'lucide-react';

interface Dealer {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  services: string[];
  isMain?: boolean;
}

const DEALERS_LIST: Dealer[] = [
  {
    id: 'parimita-lalitpur',
    name: 'Parimita Import Export Pvt. Ltd.',
    type: 'Main Distributor',
    city: 'Lalitpur',
    address: 'Jawalakhel, Main Boulevard',
    landmark: 'Opposite Central Zoo Gate',
    phone: '+977-9705660297',
    hours: 'Sun – Fri: 9:00 AM – 6:30 PM',
    services: ['Sales', 'Test Rides', 'Service Center', 'Spare Parts', 'Fast Charging'],
    isMain: true,
  },
  {
    id: 'dayang-kathmandu-naxal',
    name: 'Dayang EV City Center',
    type: 'Authorized Dealer',
    city: 'Kathmandu',
    address: 'Naxal, Bhagawati Bahal Road',
    landmark: 'Near Naxal Bhatbhateni',
    phone: '+977-9801122334',
    hours: 'Sun – Fri: 9:30 AM – 6:00 PM',
    services: ['Sales', 'Test Rides', 'Service', 'Accessories'],
  },
  {
    id: 'dayang-pokhara',
    name: 'Pokhara EV Mobility',
    type: 'Authorized Dealer',
    city: 'Pokhara',
    address: 'Sabhagriha Chowk, New Road',
    landmark: 'Near Sabhagriha Hall',
    phone: '+977-9856012345',
    hours: 'Sun – Fri: 9:00 AM – 6:00 PM',
    services: ['Sales', 'Test Rides', 'Service', 'Spare Parts'],
  },
  {
    id: 'dayang-chitwan',
    name: 'Chitwan Electric Motors',
    type: 'Authorized Dealer',
    city: 'Chitwan',
    address: 'Lions Chowk, Narayangarh',
    landmark: 'Near Highway Circle',
    phone: '+977-9855098765',
    hours: 'Sun – Fri: 9:00 AM – 6:30 PM',
    services: ['Sales', 'Test Rides', 'Service'],
  },
  {
    id: 'dayang-butwal',
    name: 'Butwal EV Showroom',
    type: 'Service & Spares',
    city: 'Butwal',
    address: 'Traffic Chowk, Main Road',
    landmark: 'Opposite Siddhartha Bank',
    phone: '+977-9857034567',
    hours: 'Sun – Fri: 9:30 AM – 6:00 PM',
    services: ['Sales', 'Service', 'Spare Parts'],
  },
  {
    id: 'dayang-biratnagar',
    name: 'Biratnagar Dayang EV',
    type: 'Authorized Dealer',
    city: 'Biratnagar',
    address: 'Main Road, Ward No. 3',
    landmark: 'Near Traffic Police Post',
    phone: '+977-9852088990',
    hours: 'Sun – Fri: 9:00 AM – 6:00 PM',
    services: ['Sales', 'Test Rides', 'Service'],
  },
];

export default function DealersPage() {
  const [searchCity, setSearchCity] = useState('');
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);

  const query = searchCity.trim().toLowerCase();
  const filteredDealers = DEALERS_LIST.filter(
    (d) => d.city.toLowerCase().includes(query) || d.name.toLowerCase().includes(query)
  );

  const mainDealer = DEALERS_LIST[0];

  return (
    <div className="flex min-h-screen flex-col bg-page text-body">
      <Head>
        <title>Dealers — Dayang EV Nepal</title>
        <meta
          name="description"
          content="Find authorized Dayang EV showrooms and service centers across Nepal — Lalitpur, Kathmandu, Pokhara, Chitwan, Butwal and Biratnagar."
        />
      </Head>

      <Navbar onOpenTestRide={() => setIsTestRideOpen(true)} />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative -mt-18 overflow-hidden pt-18">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_35%_25%,black,transparent)]" />
            <div className="absolute -top-32 left-1/3 h-[26rem] w-[38rem] rounded-full bg-brand-200/45 blur-[110px]" />
          </div>

          <div className="container-page py-20 lg:py-24">
            <div className="max-w-2xl animate-fade-up">
              <p className="eyebrow">
                <span className="h-px w-6 bg-brand-600/60" aria-hidden />
                Dealer network
              </p>
              <h1 className="mt-5 text-[2.75rem] leading-[1.03] sm:text-6xl font-bold text-ink">
                Find a showroom
                <br />
                <span className="text-gradient">near you.</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-body">
                {DEALERS_LIST.length} authorized Dayang EV showrooms and service centres across
                Nepal, all backed by the same warranty and genuine parts.
              </p>

              <div className="relative mt-9 max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Search by city or showroom name…"
                  aria-label="Search dealers"
                  className="w-full rounded-full border border-line bg-page-alt py-3 pl-11 pr-10 text-sm text-ink placeholder-faint transition-colors hover:border-ink/20 focus:border-brand-600 focus:outline-none"
                />
                {searchCity && (
                  <button
                    onClick={() => setSearchCity('')}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted transition-colors hover:bg-page-alt hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main distributor */}
        <section className="container-page py-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-brand-50 via-card to-card p-8 shadow-card sm:p-10 lg:p-12">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100/60 blur-[90px]"
                aria-hidden
              />

              <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
                <div className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                    <Star className="h-3 w-3 fill-brand-600 text-brand-600" />
                    Main authorized distributor
                  </span>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    {mainDealer.name}
                  </h2>

                  <div className="space-y-3 text-sm text-body">
                    <p className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span>
                        {mainDealer.address}, {mainDealer.city}, Nepal
                        <br />
                        <span className="text-muted">{mainDealer.landmark}</span>
                      </span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-brand-600" />
                      <a
                        href={`tel:${mainDealer.phone.replace(/-/g, '')}`}
                        className="font-medium text-ink transition-colors hover:text-brand-600 tabular-nums"
                      >
                        {mainDealer.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-brand-600" />
                      {mainDealer.hours}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {mainDealer.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line bg-page-alt px-3 py-1 text-xs text-body"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:min-w-[13rem] lg:flex-col">
                  <Button onClick={() => setIsTestRideOpen(true)}>
                    <PhoneCall className="h-4 w-4" />
                    <span>Book test ride</span>
                  </Button>
                  <Button
                    variant="secondary"
                    href="https://maps.google.com/?q=Jawalakhel+Lalitpur+Nepal"
                    external
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Get directions</span>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* All dealers */}
        <section className="container-page py-16 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="All locations"
              title="Every authorized showroom"
              description="Sales, test rides and service — call ahead to confirm stock of a specific model."
            >
              <span className="rounded-full border border-line bg-page-alt px-4 py-2 text-xs text-body tabular-nums">
                {filteredDealers.length} of {DEALERS_LIST.length} shown
              </span>
            </SectionHeading>
          </Reveal>

          {filteredDealers.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredDealers.map((dealer, i) => (
                <Reveal key={dealer.id} delay={i * 60} as="article" className="h-full">
                  <div className="group flex h-full flex-col gap-4 rounded-3xl surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                          {dealer.city}
                        </span>
                        <span className="rounded-full border border-line bg-page-alt px-2.5 py-0.5 text-[10px] text-muted">
                          {dealer.type}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-ink">{dealer.name}</h3>
                    </div>

                    <div className="space-y-2 text-xs text-muted">
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                        <span>
                          {dealer.address}
                          <br />
                          {dealer.landmark}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-muted" />
                        <a
                          href={`tel:${dealer.phone.replace(/-/g, '')}`}
                          className="text-body transition-colors hover:text-brand-600 tabular-nums"
                        >
                          {dealer.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-muted" />
                        {dealer.hours}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                      {dealer.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line bg-page-alt px-2 py-0.5 text-[10px] text-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsTestRideOpen(true)}
                      className="mt-auto cursor-pointer rounded-full border border-line bg-page-alt py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink/20 hover:bg-page-alt hover:text-ink"
                    >
                      Schedule a visit
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl surface py-20 text-center">
              <MapPin className="mx-auto h-6 w-6 text-muted" />
              <p className="mt-4 text-body">
                No showrooms match “{searchCity}”.
              </p>
              <button
                onClick={() => setSearchCity('')}
                className="mt-3 cursor-pointer text-sm font-medium text-brand-600 underline-offset-4 hover:underline"
              >
                Show all locations
              </button>
            </div>
          )}
        </section>

        {/* Become a dealer */}
        <section className="container-page pb-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] surface p-8 sm:p-10">
              <div
                className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-200/40 blur-[80px]"
                aria-hidden
              />
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-ink">
                    Become an authorized dealer
                  </h3>
                  <p className="text-sm text-body">
                    Interested in opening a Dayang EV showroom in your city? We are expanding
                    outside the valley.
                  </p>
                </div>
                <Button href="tel:+9779705660297">
                  <Phone className="h-4 w-4" />
                  <span className="tabular-nums">+977-9705660297</span>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
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
