'use client';

import styles from './IntroSection.module.css';

interface IntroSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'title'
> {
  title: React.ReactNode;
  heroImageUrl: string;
}

export function IntroSection({
  children,
  className,
  heroImageUrl,
  title,
}: IntroSectionProps) {
  return (
    <section
      style={{ backgroundImage: `url(${heroImageUrl})` }}
      className={`${styles.intro} ${className ?? ''} relative flex min-h-[70dvh] w-full flex-col justify-end bg-cover bg-top-left px-16 pb-20`}
    >
      <div>
        <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
        <p className="w-[35ch] text-2xl">
          Guardería náutica y servicios para que disfrutes de tu embarcación
          cuando quieras.
        </p>
        {children}
      </div>
    </section>
  );
}
