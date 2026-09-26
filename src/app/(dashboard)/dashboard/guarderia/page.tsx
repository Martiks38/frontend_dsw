import { redirect } from 'next/navigation';

import { DepartureBoard } from '@/components/departure/DepartureBoard';
import type {
  ServiceRequestListResponse,
  ServiceTypeOption,
} from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Ingreso/Retiro | Guardería Náutica' };

const DEPARTURE_SERVICE_NAME = 'Botadura y retiro';

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function GuarderiaPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'OPERATOR') redirect('/dashboard');

  const { search } = await searchParams;

  const serviceTypes =
    await serverFetch<ServiceTypeOption[]>('/api/service-types');
  const departureType = serviceTypes?.find(
    (st) => st.name === DEPARTURE_SERVICE_NAME
  );

  if (!departureType) {
    return (
      <p className="text-sm text-slate-500">
        No se encontró el tipo de servicio de botadura y retiro.
      </p>
    );
  }

  const query = new URLSearchParams();
  query.set('serviceTypeId', String(departureType.serviceTypeId));
  query.set('statuses', 'SCHEDULED,IN_PROGRESS');
  query.set('limit', '50');
  if (search) query.set('search', search);

  const result = await serverFetch<ServiceRequestListResponse>(
    `/api/service-requests?${query.toString()}`
  );
  if (!result) redirect('/iniciar-sesion');

  return <DepartureBoard rows={result.data} currentSearch={search} />;
}
