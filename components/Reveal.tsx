import React, { useCallback, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger in ms, applied as a transition delay. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

/**
 * Fades and lifts its children in once they scroll into view.
 * Styling lives in the `reveal` utility; this only toggles data-visible.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}) => {
  const [visible, setVisible] = useState(false);

  // A ref callback (rather than an effect) so the observer attaches to the
  // node itself and React 19 tears it down via the returned cleanup.
  const observe = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={observe as React.Ref<never>}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
};
