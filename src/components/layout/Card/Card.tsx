import { type CardFeature } from '@/interfaces';

interface CardProps {
  data: CardFeature;
}

export default function Card({ data }: CardProps) {
  const { icon: Icon } = data;

  return (
    <article className="flex h-full max-w-60 flex-col rounded-xl border border-(--primary-color-40) p-4 text-center shadow-md">
      <Icon size={60} className="mx-auto" aria-hidden="true" />
      <h3 className="mt-2.5 mb-4 min-h-[3.2rem] text-xl font-semibold">
        {data.label}
      </h3>
      <p>{data.description}</p>
    </article>
  );
}
