import Icon from '@/components/ui/Icon/Icon';
import type { HomeFeature } from '@/interfaces/homeFeature.interface';

export default function Card({ data }: { data: HomeFeature }) {
  return (
    <article>
      <Icon id={data.id} size={60} />
      <h3>{data.label}</h3>
      <p>{data.description}</p>
    </article>
  );
}
