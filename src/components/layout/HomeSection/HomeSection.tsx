import { HomeFeature } from '@/interfaces/homeFeature.interface';

import Card from '../Card/Card';

interface HomeSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  cardData?: HomeFeature[];
}

export default function HomeSection({
  title,
  cardData,
  children,
  className,
}: HomeSectionProps) {
  return (
    <section className={`${className ?? ''} mt-12`} aria-label={title}>
      <h2 className="text-3xl text-center font-semibold">{title}</h2>
      {cardData && (
        <ul className="flex gap-10 mt-8">
          {cardData.map((feature) => (
            <li className="flex-1" key={feature.label}>
              <Card data={feature} />
            </li>
          ))}
        </ul>
      )}
      {children}
    </section>
  );
}
