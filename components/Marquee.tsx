import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  // Rendered twice so the -50% keyframe loops seamlessly.
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-page-alt py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-12">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-brand-600" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
