import { Calendar, FileText, Ship, Wrench } from 'lucide-react';

import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { type DashboardVariant } from '@/interfaces';

import { ServiceRankingList } from './ServiceRankingList';
import { TaskList } from './TaskList';

export function MemberDashboard({ data }: DashboardVariant<'MEMBER'>) {
  return (
    <>
      <StatGrid heading="Resumen de tu cuenta">
        <StatCard
          label="Embarcaciones activas"
          value={data.stats.activeBoats}
          icon={Ship}
        />
        <StatCard
          label="Solicitudes pendientes"
          value={data.stats.pendingRequests}
          icon={FileText}
          accent="amber"
        />
        <StatCard
          label="Servicios este mes"
          value={data.stats.servicesThisMonth}
          icon={Wrench}
          accent="blue"
        />
        <StatCard
          label="Próximo servicio"
          value={
            data.stats.nextServiceInDays !== null
              ? `${data.stats.nextServiceInDays} días`
              : '—'
          }
          icon={Calendar}
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
