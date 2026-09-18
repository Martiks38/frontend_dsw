import { redirect } from 'next/navigation';

import { ServiceRequestWizard } from '@/components/service-request/ServiceRequestWizard';
import type { MyBoatCard, ServiceTypeOption } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

interface PageProps {
  searchParams: Promise<{ servicio?: string }>;
}

export const metadata = { title: 'Solicitar servicio | Guardería Náutica' };

export default async function ServiceRequestPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();

  if (!user) redirect('/iniciar-sesion');

  const { servicio } = await searchParams;

  const [boats, serviceTypes] = await Promise.all([
    serverFetch<MyBoatCard[]>('/api/boats/me'),
    serverFetch<ServiceTypeOption[]>('/api/service-types'),
  ]);

  if (!boats || !serviceTypes) redirect('/iniciar-sesion');

  return (
    <ServiceRequestWizard
      boats={boats}
      serviceTypes={serviceTypes}
      preselectedServiceSlug={servicio}
    />
  );
}
