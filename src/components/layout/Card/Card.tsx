import Icon from '@/components/ui/Icon/Icon';
import type { HomeFeature } from '@/interfaces/homeFeature.interface';

export default function Card({ data }: { data: HomeFeature }) {
  return (
    <article className="h-full max-w-60 text-center">
      <Icon id={data.id} size={60} className="mx-auto" />
      <h3 className="mt-2.5 mb-4 text-xl font-semibold">{data.label}</h3>
      <p>{data.description}</p>
    </article>
  );
}
