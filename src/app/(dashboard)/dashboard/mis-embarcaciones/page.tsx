import { redirect } from 'next/navigation';

import { BoatCard } from '@/components/ui/BoatCard/BoatsCard';
import { type MyBoatCard } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = {
  title: 'Mis embarcaciones | Guardería Náutica',
};

export default async function MyBoatsPage() {
  const user = await getCurrentUser();

  if (!user) redirect('/iniciar-sesion');

  const boats = await serverFetch<MyBoatCard[]>('/api/boats/me');

  if (!boats) redirect('/iniciar-sesion');

  if (boats.length === 0) {
    return (
      <p className="mt-6 text-base text-slate-700">
        No hay embaraciones registradas en guardería.
      </p>
    );
  }

  return (
    <section
      aria-labelledby="page-heading"
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {boats.map((boat) => (
        <BoatCard key={boat.id} boat={boat} />
      ))}
    </section>
  );
}
