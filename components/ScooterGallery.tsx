import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScooterGalleryProps {
  images: string[];
  name: string;
}

export const ScooterGallery: React.FC<ScooterGalleryProps> = ({ images, name }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const count = images.length;
  const currentImage = images[selectedIndex] || images[0];

  const step = (delta: number) => setSelectedIndex((i) => (i + delta + count) % count);

  return (
    <div className="space-y-3">
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-page-alt shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={currentImage}
          src={currentImage}
          alt={`${name} — view ${selectedIndex + 1} of ${count}`}
          className="relative h-full w-full object-cover animate-fade-up"
        />

        {count > 1 && (
          <>
            <button
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-card/90 text-ink opacity-0 shadow-card backdrop-blur transition-all hover:bg-card group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-card/90 text-ink opacity-0 shadow-card backdrop-blur transition-all hover:bg-card group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    selectedIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Show image ${idx + 1}`}
              aria-current={selectedIndex === idx}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? 'border-brand-600 opacity-100'
                  : 'border-line opacity-60 hover:opacity-100 hover:border-ink/20'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
