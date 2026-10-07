import { redirect } from 'next/navigation';

import { NewClientForm } from '@/components/clients/NewClientForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata = { title: 'Nuevo cliente | Guardería Náutica' };

export default async function NewClientPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div>
      {/* ! Agregar en dashboard nav */}
      <header>
        <h1 className="text-xl font-semibold text-slate-900">Nuevo cliente</h1>
        <p className="text-sm text-slate-500">
          Se le enviará un correo con sus credenciales de acceso.
        </p>
      </header>
      <div className="mt-6">
        <NewClientForm />
      </div>
    </div>
  );
}
