import Card from '@/components/layout/Card/Card';
import { HomeFeature } from '@/interfaces';

export default function CardList({ cards }: { cards: HomeFeature[] }) {
  return (
    <ul className="mt-8 flex justify-around gap-4">
      {cards.map((card) => (
        <li className="max-w-60 flex-1 justify-items-center" key={card.label}>
          <Card data={card} />
        </li>
      ))}
    </ul>
  );
}
