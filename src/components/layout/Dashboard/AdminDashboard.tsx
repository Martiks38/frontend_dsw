import { FileText, Ship, Users, Wrench } from 'lucide-react';

import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { type DashboardVariant } from '@/interfaces';

import { PendingRequestsTable } from './PendingRequestsTask';

export function AdminDashboard({ data }: DashboardVariant<'ADMIN'>) {
  return (
    <>
      <StatGrid heading="Resumen general">
        <StatCard
          label="Clientes"
          value={data.stats.clients}
          helperText={`+${data.stats.newClientsThisMonth} este mes`}
          icon={Users}
        />
        <StatCard
          label="Embarcaciones"
          value={data.stats.boats}
          helperText={`+${data.stats.newBoatsThisMonth} este mes`}
          icon={Ship}
          accent="blue"
        />
        <StatCard
          label="Solicitudes"
          value={data.stats.pendingRequests}
          helperText="Pendientes"
          icon={FileText}
          accent="amber"
        />
        <StatCard
          label="Servicios hoy"
          value={data.stats.servicesInProgressToday}
          helperText="En proceso"
          icon={Wrench}
          accent="green"
        />
      </StatGrid>

      <PendingRequestsTable rows={data.pendingRequests} className="mt-8" />
    </>
  );
}
