import { redirect } from 'next/navigation';

import { GuardiaTable } from '@/components/boats/GuardiaTable';
import { type GuardiaOverview } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Guardería | Guardería Náutica' };

export default async function GuardiaPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const overview = await serverFetch<GuardiaOverview>('/api/boats/guarderia');
  if (!overview) redirect('/iniciar-sesion');

  return <GuardiaTable overview={overview} />;
}
