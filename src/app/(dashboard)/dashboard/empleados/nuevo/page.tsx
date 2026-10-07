import { redirect } from 'next/navigation';

import { NewEmployeeForm } from '@/components/employees/NewEmployeeForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata = { title: 'Nuevo empleado | Guardería Náutica' };

export default async function NewEmployeePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div>
      <header>
        <h1 className="text-xl font-semibold text-slate-900">Nuevo empleado</h1>
        <p className="text-sm text-slate-500">
          Se le enviará un correo con sus credenciales de acceso.
        </p>
      </header>
      <div className="mt-6">
        <NewEmployeeForm />
      </div>
    </div>
  );
}
