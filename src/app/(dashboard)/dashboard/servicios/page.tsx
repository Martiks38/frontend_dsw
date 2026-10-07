import { redirect } from 'next/navigation';

import { AdminServicesTracker } from '@/components/services/AdminServicesTracker';
import { ServicesCatalog } from '@/components/services/ServicesCatalog';
import { type ServiceRequestListResponse } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Servicios | Guardería Náutica' };

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string }>;
}

export default async function ServiciosPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();

  if (!user) redirect('/iniciar-sesion');

  if (user.role !== 'ADMIN') {
    return <ServicesCatalog />;
  }

  const params = await searchParams;
  const status = params.status ?? 'IN_PROGRESS';

  const query = new URLSearchParams();
  query.set('status', status);

  if (params.search) {
    query.set('search', params.search);
  }

  query.set('limit', '50');

  const result = await serverFetch<ServiceRequestListResponse>(
    `/api/service-requests?${query.toString()}`
  );

  if (!result) redirect('/iniciar-sesion');

  return (
    <AdminServicesTracker
      rows={result.data}
      currentStatus={status}
      currentSearch={params.search}
    />
  );
}
