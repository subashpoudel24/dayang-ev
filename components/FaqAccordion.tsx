import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Faq {
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  {
    q: 'How far will one charge really take me?',
    a: 'The rated range is 90 km. In everyday Kathmandu riding — stop-start traffic, a pillion, some hills — expect roughly 65 to 80 km. Riding gently in Eco mode gets you closer to the rated figure.',
  },
  {
    q: 'What does a full charge cost?',
    a: 'The 72V 32Ah pack holds about 2.3 kWh, so a full charge costs under Rs. 25 at current domestic tariffs. A full charge takes about 3.5 hours from a standard household socket.',
  },
  {
    q: 'Do I need a licence or registration?',
    a: 'These scooters fall under Nepal’s electric two-wheeler category. Our Jawalakhel showroom handles the registration paperwork with you at the time of purchase and will confirm the current licence requirement for your model.',
  },
  {
    q: 'How long does the battery last before replacement?',
    a: 'Graphene cells typically hold usable capacity for around three times as many charge cycles as lead-acid packs. With normal daily charging that generally works out to several years before you would consider a replacement.',
  },
  {
    q: 'What does the warranty cover?',
    a: 'One year of factory coverage on the motor, controller and battery pack through Parimita Import Export Pvt. Ltd. Service, genuine spares and certified technicians are available at the Jawalakhel centre.',
  },
  {
    q: 'Can I take a test ride before buying?',
    a: 'Yes, and there is no obligation. Book a slot through the form on this site or call the showroom directly — both models are kept charged and ready at Jawalakhel.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card shadow-card">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-page-alt sm:px-7"
            >
              <span
                className={`text-[15px] font-medium transition-colors ${
                  isOpen ? 'text-ink' : 'text-body'
                }`}
              >
                {faq.q}
              </span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? 'rotate-45 border-brand-300 bg-brand-50 text-brand-600'
                    : 'border-line text-muted'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>

            <div
              className={`grid transition-all duration-400 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pr-14 text-sm leading-relaxed text-body sm:px-7">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
