import { HomeFeature } from '@/interfaces/homeFeature.interface';

import Card from '../../Card/Card';

interface HomeSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  cardData?: HomeFeature[];
}

export function HomeSection({
  title,
  cardData,
  children,
  className,
}: HomeSectionProps) {
  return (
    <section className={`${className ?? ''} mt-12`} aria-label={title}>
      <h2 className="text-center text-3xl font-semibold">{title}</h2>
      {cardData && (
        <ul className="mt-8 flex justify-around gap-4">
          {cardData.map((feature) => (
            <li
              className="max-w-60 flex-1 justify-items-center"
              key={feature.label}
            >
              <Card data={feature} />
            </li>
          ))}
        </ul>
      )}
      {children}
    </section>
  );
}
