import { redirect } from 'next/navigation';

import { OperationsPage } from '@/components/operations/OperationsPage';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Operaciones | Guardería Náutica',
};

export default async function OperacionesPage() {
  const user = await getCurrentUser();

  if (!user) redirect('/iniciar-sesion');
  if (user.role !== 'OPERATOR') redirect('/dashboard');

  return <OperationsPage />;
}
