'use client';

import { cn } from '@/lib/cn';

import styles from './IntroSection.module.css';

interface IntroSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'title'
> {
  title: React.ReactNode;
  heroImageUrl: string;
  shadowDefault?: boolean;
}

export function IntroSection({
  children,
  className,
  heroImageUrl,
  title,
  shadowDefault = false,
}: IntroSectionProps) {
  return (
    <section
      style={{ '--hero-bg': `url(${heroImageUrl})` } as React.CSSProperties}
      className={cn(
        styles.intro,
        shadowDefault && styles.shadow,
        className,
        'flex h-full w-full flex-col justify-end bg-cover bg-top-left bg-no-repeat p-10 md:min-h-[70dvh] md:px-16 md:py-20'
      )}
      aria-labelledby="intro-title"
    >
      <div>
        <h1
          id="intro-title"
          className="mb-4 text-2xl font-semibold sm:text-4xl"
        >
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
