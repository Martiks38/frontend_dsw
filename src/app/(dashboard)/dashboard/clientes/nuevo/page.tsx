import { redirect } from 'next/navigation';

import { NewClientForm } from '@/components/clients/NewClientForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata = { title: 'Nuevo cliente | Guardería Náutica' };

export default async function NewClientPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div className="mt-6">
      <NewClientForm />
    </div>
  );
}
