import { redirect } from 'next/navigation';

import { HeaderDashboard } from '@/components/layout/Dashboard/HeaderDashboard';
import { Sidebar } from '@/components/ui/Sidebar/Sidebar';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect('/iniciar-sesion');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderDashboard userName={user.name} role={user.role} />
        <main id="main-content" className="flex-1 p-6.5">
          {children}
        </main>
      </div>
    </div>
  );
}
