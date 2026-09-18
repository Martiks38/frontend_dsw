import { redirect } from 'next/navigation';

import { ServiceRequestFilters } from '@/components/ui/Filters/ServiceRequestFilters';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { ServiceRequestsTable } from '@/components/ui/ServiceRequest/ServiceRequestsTable';
import type {
  ServiceRequestListResponse,
  ServiceRequestSearchParams,
  ServiceTypeOption,
} from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Solicitudes | Guardería Náutica' };

interface PageProps {
  searchParams: Promise<ServiceRequestSearchParams>;
}

export default async function ServiceRequestsRoute({
  searchParams,
}: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect('/iniciar-sesion');

  const params = await searchParams;

  const query = new URLSearchParams();

  if (params.status) query.set('status', params.status);
  if (params.serviceTypeId) query.set('serviceTypeId', params.serviceTypeId);
  if (params.from) query.set('from', params.from);
  if (params.until) query.set('until', params.until);

  query.set('page', params.page ?? '1');
  query.set('limit', '10');

  const [result, serviceTypes] = await Promise.all([
    serverFetch<ServiceRequestListResponse>(
      `/api/service-requests?${query.toString()}`
    ),
    serverFetch<ServiceTypeOption[]>('/api/service-types'),
  ]);

  if (!result) redirect('/iniciar-sesion');

  return (
    <>
      <ServiceRequestFilters
        serviceTypes={serviceTypes ?? []}
        currentFilters={params}
      />
      <ServiceRequestsTable
        rows={result.data}
        headingId="solicitudes-heading"
      />
      <Pagination meta={result.meta} currentSearchParams={params} />
    </>
  );
}
