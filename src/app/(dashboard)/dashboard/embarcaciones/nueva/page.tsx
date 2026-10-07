import { redirect } from 'next/navigation';

import { NewBoatForm } from '@/components/boats/NewBoatForm';
import type { BoatTypeOption, ClientOption, CradleOption } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Nueva embarcación | Guardería Náutica' };

export default async function NewBoatPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const [clients, boatTypes, cradles] = await Promise.all([
    serverFetch<ClientOption[]>('/api/clientes/opciones'),
    serverFetch<BoatTypeOption[]>('/api/boat-types'),
    serverFetch<CradleOption[]>('/api/cradles/disponibles'),
  ]);

  if (!clients || !boatTypes) redirect('/iniciar-sesion');

  return (
    <div>
      <header>
        <h1 className="text-xl font-semibold text-slate-900">
          Nueva embarcación
        </h1>
        <p className="text-sm text-slate-500">
          Registrá la embarcación junto con su contrato de guarda.
        </p>
      </header>
      <div className="mt-6">
        <NewBoatForm
          clients={clients}
          boatTypes={boatTypes}
          cradles={cradles ?? []}
        />
      </div>
    </div>
  );
}
