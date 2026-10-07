import { redirect } from 'next/navigation';

import { AdminEmployeesTable } from '@/components/employees/AdminEmployeesTable';
import { type EmployeeListItem } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Empleados | Guardería Náutica' };

export default async function EmployeesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const employees = await serverFetch<EmployeeListItem[]>('/api/empleados');
  if (!employees) redirect('/iniciar-sesion');

  return <AdminEmployeesTable employees={employees} />;
}
