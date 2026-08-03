import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  children,
}) => {
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-5 ${
        centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'
      } ${className}`}
    >
      <div className={`space-y-3 ${centered ? 'max-w-2xl' : 'max-w-2xl'}`}>
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-6 bg-brand-600/60" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-[1.1]">{title}</h2>
        {description && <p className="text-[15px] leading-relaxed text-body">{description}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
};
