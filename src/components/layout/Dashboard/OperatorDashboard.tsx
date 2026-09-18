import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { type OperatorDashboardProps } from '@/interfaces/dashboard.interface';

import { ServiceRankingList } from './ServiceRankingList';
import { TaskList } from './TaskList';

export function OperatorDashboard({ data }: OperatorDashboardProps) {
  const nextTask = data.todayTasks[0] ?? null;

  return (
    <div className="flex flex-col gap-4">
      <StatGrid heading="Resumen de hoy">
        <StatCard
          label="Tareas hoy"
          value={data.stats.tasksToday}
          helperText="por atender"
          iconName="clipboard-list"
        />
        <StatCard
          label="En proceso"
          value={data.stats.inProgress}
          helperText="hoy"
          iconName="loader"
          accent="blue"
        />
        <StatCard
          label="Completadas"
          value={data.stats.completedToday}
          helperText="hoy"
          iconName="check-circle"
          accent="green"
        />
        <StatCard
          label="Total solicitudes"
          value={data.stats.totalThisMonth}
          helperText="este mes"
          iconName="list-check"
          accent="amber"
        />
      </StatGrid>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskList
            title="Mis tareas de hoy"
            description="Solicitudes asignadas para el día de hoy"
            items={data.todayTasks}
            viewAllHref="/solicitudes?fecha=hoy"
          />
        </div>

        <div className="space-y-4">
          {nextTask ? (
            <section
              aria-labelledby="next-task-heading"
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2
                id="next-task-heading"
                className="mb-3 text-base font-semibold text-slate-900"
              >
                Próxima tarea
              </h2>
              <p className="text-2xl font-semibold text-slate-900">
                <time dateTime={nextTask.scheduledAtISO}>
                  {nextTask.scheduledAtLabel}
                </time>
              </p>
              <p className="text-sm text-slate-500">
                {nextTask.serviceTypeName}
              </p>
              <p className="mt-2 text-sm text-slate-700">{nextTask.boatName}</p>
              <a
                href={nextTask.href}
                className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              >
                Ver detalles
              </a>
            </section>
          ) : null}

          <ServiceRankingList
            title="Servicios más solicitados"
            items={data.topServicesThisMonth}
          />
        </div>
      </div>
    </div>
  );
}
