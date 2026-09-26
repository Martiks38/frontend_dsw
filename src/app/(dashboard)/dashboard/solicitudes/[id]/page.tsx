import { notFound, redirect } from 'next/navigation';

import { ServiceRequestDetailView } from '@/components/service-request/ServiceRequestDetailView/ServiceRequestDetailView';
import type { OperatorOption, ServiceRequestDetail } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Detalle de solicitud | Guardería Náutica' };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceRequestDetailPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect('/iniciar-sesion');

  const { id } = await params;

  const detail = await serverFetch<ServiceRequestDetail>(
    `/api/service-requests/${id}`
  );
  if (!detail) notFound();

  const canAssign =
    user.role === 'ADMIN' &&
    (detail.status === 'PENDING' || detail.status === 'SCHEDULED');
  const operators = canAssign
    ? await serverFetch<OperatorOption[]>('/api/empleados/operadores')
    : null;

  return (
    <ServiceRequestDetailView
      detail={detail}
      role={user.role}
      operators={operators ?? []}
    />
  );
}
