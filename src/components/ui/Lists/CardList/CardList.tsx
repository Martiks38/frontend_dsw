import Card from '@/components/layout/Card/Card';
import { type CardFeature } from '@/interfaces';

export default function CardList({ cards }: { cards: CardFeature[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <li className="max-w-60 flex-1" key={card.label}>
          <Card data={card} />
        </li>
      ))}
    </ul>
  );
}
