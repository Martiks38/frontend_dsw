import { redirect } from 'next/navigation';

import { AdminDashboard } from '@/components/layout/Dashboard/AdminDashboard';
import { MemberDashboard } from '@/components/layout/Dashboard/MemberDashboard';
import { OperatorDashboard } from '@/components/layout/Dashboard/OperatorDashboard';
import {
  AdminDashboardData,
  MemberDashboardData,
  OperatorDashboardData,
} from '@/interfaces/dashboard.interface';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = {
  title: 'Dashboard | Guardería Náutica',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect('/iniciar-sesion');

  switch (user.role) {
    case 'MEMBER': {
      const data = await requireDashboardData<MemberDashboardData>(
        '/api/dashboard/socio'
      );

      return <MemberDashboard data={data} />;
    }
    case 'ADMIN': {
      const data = await requireDashboardData<AdminDashboardData>(
        '/api/dashboard/admin'
      );

      return <AdminDashboard data={data} />;
    }
    case 'OPERATOR': {
      const data = await requireDashboardData<OperatorDashboardData>(
        '/api/dashboard/operador'
      );

      return <OperatorDashboard data={data} />;
    }
    default: {
      redirect('/iniciar-sesion');
    }
  }
}

async function requireDashboardData<T>(path: string): Promise<T> {
  const data = await serverFetch<T>(path);

  if (!data) redirect('/iniciar-sesion');

  return data;
}
