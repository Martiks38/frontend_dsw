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
    <section className={className}>
      <h2>{title}</h2>
      {cardData && (
        <ul>
          {cardData
            .filter((feature) => feature.showOnHome)
            .map((feature) => (
              <li key={feature.label}>
                <Card data={feature} />
              </li>
            ))}
        </ul>
      )}
      {children}
    </section>
  );
}
