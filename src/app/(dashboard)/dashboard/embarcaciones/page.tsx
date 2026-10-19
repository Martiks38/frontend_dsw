import { redirect } from 'next/navigation';

import { AdminBoatsTable } from '@/components/boats/AdminBoatsTable';
import { type BoatsAdminOverview } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Embarcaciones | Guardería Náutica' };

export default async function AdminBoatsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const overview = await serverFetch<BoatsAdminOverview>('/api/boats');
  if (!overview) redirect('/iniciar-sesion');

  return <AdminBoatsTable overview={overview} />;
}
