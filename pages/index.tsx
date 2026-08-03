import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { ScooterCard } from '../components/ScooterCard';
import { FilterBar } from '../components/FilterBar';
import { TestRideModal } from '../components/TestRideModal';
import { Footer } from '../components/Footer';
import { Marquee } from '../components/Marquee';
import { TechSection } from '../components/TechSection';
import { FaqAccordion } from '../components/FaqAccordion';
import { CtaBand } from '../components/CtaBand';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { Scooter } from '../lib/types';
import { INITIAL_SCOOTERS } from '../lib/seedData';
import { RefreshCw, ArrowRight } from 'lucide-react';

interface HomePageProps {
  initialScooters: Scooter[];
  fallbackMode?: boolean;
}

const MARQUEE_ITEMS = [
  '72V 32Ah Graphene battery',
  '3000W peak BLDC motor',
  'TCS cruise control',
  'Reverse gear assist',
  'Dual disc brakes',
  '1-year authorized warranty',
  'Anti-theft alarm',
  'Under Rs. 25 per charge',
];

export default function Home({ initialScooters }: HomePageProps) {
  const [scooters, setScooters] = useState<Scooter[]>(initialScooters || INITIAL_SCOOTERS);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minRange, setMinRange] = useState(0);
  const [sortBy, setSortBy] = useState('popular');

  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [selectedScooterForModal, setSelectedScooterForModal] = useState<string | undefined>();

  const showcaseRef = useRef<HTMLElement>(null);

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenTestRide = (scooterId?: string) => {
    setSelectedScooterForModal(scooterId);
    setIsTestRideOpen(true);
  };

  useEffect(() => {
    async function fetchFilteredScooters() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
        if (maxPrice < 500000) params.append('maxPrice', maxPrice.toString());
        if (minRange > 0) params.append('minRange', minRange.toString());
        if (sortBy) params.append('sortBy', sortBy);

        const res = await fetch(`/api/scooters?${params.toString()}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setScooters(data.data);
        }
      } catch (err) {
        console.error('Error fetching filtered scooters:', err);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(fetchFilteredScooters, 250);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, maxPrice, minRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(500000);
    setMinRange(0);
    setSortBy('popular');
  };

  return (
    <div className="flex min-h-screen flex-col bg-page text-body">
      <Navbar onOpenTestRide={() => handleOpenTestRide()} />

      <main className="flex-grow">
        <HeroBanner
          onExploreClick={scrollToShowcase}
          onTestRideClick={() => handleOpenTestRide()}
        />

        <Marquee items={MARQUEE_ITEMS} />

        {/* Model showcase */}
        <section ref={showcaseRef} id="models" className="container-page scroll-mt-24 py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="The lineup"
              title="Two models. One serious drivetrain."
              description="Both share the 72V graphene pack, 3000W peak motor and full safety package — pick the body that fits your ride."
            >
              <Button variant="secondary" href="/why-dayang">
                <span>Compare against petrol</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </SectionHeading>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              minRange={minRange}
              onMinRangeChange={setMinRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              resultsCount={scooters.length}
            />
          </Reveal>

          <div className="mt-8">
            {loading ? (
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-[34rem] animate-pulse rounded-3xl border border-line bg-page-alt"
                  />
                ))}
              </div>
            ) : scooters.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
                {scooters.map((scooter, i) => (
                  <Reveal key={scooter._id || scooter.id} delay={i * 90} className="h-full">
                    <ScooterCard scooter={scooter} onTestRideClick={handleOpenTestRide} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl surface py-20 text-center">
                <RefreshCw className="mx-auto h-6 w-6 text-muted" />
                <p className="mt-4 text-body">No models match those filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-3 cursor-pointer text-sm font-medium text-brand-600 underline-offset-4 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        <TechSection />

        {/* FAQ */}
        <section className="container-page py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Questions"
                  title={
                    <>
                      Everything riders
                      <br /> ask us first
                    </>
                  }
                  description="Straight answers on range, running cost, paperwork and service — no marketing spin."
                />
                <div className="mt-8 rounded-2xl surface p-5">
                  <p className="text-sm text-body">
                    Still unsure about something?
                  </p>
                  <a
                    href="tel:+9779705660297"
                    className="mt-1.5 inline-block font-display text-lg font-bold text-ink transition-colors hover:text-brand-600 tabular-nums"
                  >
                    +977-9705660297
                  </a>
                  <p className="mt-1 text-xs text-muted">Sun–Fri, 9:00 AM – 6:30 PM</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <FaqAccordion />
            </Reveal>
          </div>
        </section>

        <Reveal>
          <CtaBand onTestRideClick={() => handleOpenTestRide()} />
        </Reveal>
      </main>

      <Footer />

      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        scooters={scooters.length ? scooters : INITIAL_SCOOTERS}
        preselectedScooterId={selectedScooterForModal}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host || 'localhost:3000';
    const res = await fetch(`${protocol}://${host}/api/scooters`);
    const data = await res.json();

    return {
      props: {
        initialScooters: data.data || INITIAL_SCOOTERS,
        fallbackMode: data.fallbackMode || false,
      },
    };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    return {
      props: {
        initialScooters: INITIAL_SCOOTERS,
        fallbackMode: true,
      },
    };
  }
};
