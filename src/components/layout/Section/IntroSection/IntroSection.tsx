'use client';

import styles from './IntroSection.module.css';

interface IntroSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'title'
> {
  title: React.ReactNode;
  heroImageUrl: string;
  variant?: 'shadowless' | 'default';
}

export function IntroSection({
  children,
  className,
  heroImageUrl,
  title,
  variant = 'default',
}: IntroSectionProps) {
  return (
    <section
      style={{ backgroundImage: `url(${heroImageUrl})` }}
      className={`${variant === 'default' ? styles.intro : ''} ${className ?? ''} flex min-h-[70dvh] w-full flex-col justify-end bg-cover bg-top-left px-16 pb-20`}
      aria-labelledby="intro-title"
    >
      <div>
        <h1 id="intro-title" className="mb-4 text-4xl font-semibold">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
