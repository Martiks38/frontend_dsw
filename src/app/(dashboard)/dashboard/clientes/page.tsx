import { redirect } from 'next/navigation';

import { AdminClientsTable } from '@/components/clients/AdminClientsTable';
import { type ClientsOverview } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Clientes | Guardería Náutica' };

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);
  query.set('page', params.page ?? '1');
  query.set('limit', '10');

  const overview = await serverFetch<ClientsOverview>(
    `/api/clientes?${query.toString()}`
  );

  if (!overview) redirect('/iniciar-sesion');

  return <AdminClientsTable overview={overview} currentParams={params} />;
}
