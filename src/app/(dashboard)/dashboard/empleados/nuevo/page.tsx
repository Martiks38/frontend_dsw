import { redirect } from 'next/navigation';

import { NewEmployeeForm } from '@/components/employees/NewEmployeeForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata = { title: 'Nuevo empleado | Guardería Náutica' };

export default async function NewEmployeePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  return (
    <div className="mt-6">
      <NewEmployeeForm />
    </div>
  );
}
