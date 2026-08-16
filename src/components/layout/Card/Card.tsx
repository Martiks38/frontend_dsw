import Icon from '@/components/ui/Icon/Icon';
import type { CardFeature } from '@/interfaces';

interface CardProps {
  data: CardFeature;
}

export default function Card({ data }: CardProps) {
  return (
    <article className="h-full max-w-60 rounded-xl border border-(--primary-color-40) p-4 text-center shadow-md">
      <Icon id={data.id} title={data.label} size={60} className="mx-auto" />
      <h3 className="mt-2.5 mb-4 text-xl font-semibold">{data.label}</h3>
      <p>{data.description}</p>
    </article>
  );
}
