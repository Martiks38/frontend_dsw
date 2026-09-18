import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { type AdminDashboardProps } from '@/interfaces/dashboard.interface';

import { PendingRequestsTable } from './PendingRequestsTask';

export function AdminDashboard({ data }: AdminDashboardProps) {
  console.log(data);
  return (
    <>
      <StatGrid heading="Resumen general">
        <StatCard
          label="Clientes"
          value={data.stats.clients}
          helperText={`+${data.stats.newClientsThisMonth} este mes`}
          iconName="users"
        />
        <StatCard
          label="Embarcaciones"
          value={data.stats.boats}
          helperText={`+${data.stats.newBoatsThisMonth} este mes`}
          iconName="anchor"
          accent="blue"
        />
        <StatCard
          label="Solicitudes"
          value={data.stats.pendingRequests}
          helperText="Pendientes"
          iconName="documents"
          accent="amber"
        />
        <StatCard
          label="Servicios hoy"
          value={data.stats.servicesInProgressToday}
          helperText="En proceso"
          iconName="maintenance"
          accent="green"
        />
      </StatGrid>

      <PendingRequestsTable rows={data.pendingRequests} className="mt-8" />
    </>
  );
}
