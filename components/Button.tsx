import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const BASE =
  'group relative inline-flex items-center justify-center gap-2 font-semibold rounded-full ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ' +
  'active:scale-[0.98] cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-brand hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-12px_rgb(225_6_0/0.55)]',
  secondary:
    'bg-card text-ink border border-line shadow-card hover:border-ink/20 hover:-translate-y-0.5 hover:shadow-lift',
  ghost: 'text-body hover:text-ink hover:bg-page-alt',
};

const SIZES: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-sm px-7 py-3.5',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
};

export const Button: React.FC<ButtonProps | AnchorProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
  } = props;

  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if ('href' in props && props.href) {
    const { href, external, ...rest } = props as AnchorProps;
    void rest;

    if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('#')) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } =
    props as ButtonProps;
  void _v;
  void _s;
  void _c;
  void _ch;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};
