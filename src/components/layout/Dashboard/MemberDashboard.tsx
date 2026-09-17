import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { type MemberDashboardProps } from '@/interfaces/dashboard.interface';

import { ServiceRankingList } from './ServiceRankingList';
import { TaskList } from './TaskList';

export function MemberDashboard({ data }: MemberDashboardProps) {
  return (
    <>
      <StatGrid heading="Resumen de tu cuenta">
        <StatCard
          label="Embarcaciones activas"
          value={data.stats.activeBoats}
          iconName="anchor"
        />
        <StatCard
          label="Solicitudes pendientes"
          value={data.stats.pendingRequests}
          iconName="documents"
          accent="amber"
        />
        <StatCard
          label="Servicios este mes"
          value={data.stats.servicesThisMonth}
          iconName="maintenance"
          accent="blue"
        />
        <StatCard
          label="Próximo servicio"
          value={
            data.stats.nextServiceInDays !== null
              ? `${data.stats.nextServiceInDays} días`
              : '—'
          }
          iconName="calendar"
          accent="green"
        />
      </StatGrid>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TaskList
          title="Solicitudes pendientes"
          items={data.pendingTasks}
          showClientName={false}
          viewAllHref="/dashboard/solicitudes"
        />
        <ServiceRankingList
          title="Servicios del mes"
          items={data.serviceCountsThisMonth}
        />
      </div>
    </>
  );
}
