import Link from 'next/link';

import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import { type TaskItem } from '@/interfaces/dashboard.interface';
import { cn } from '@/lib/cn';

interface TaskListProps {
  title: string;
  description?: string;
  items: TaskItem[];
  showClientName?: boolean;
  viewAllHref: string;
  emptyMessage?: string;
}

const styles: Record<string, string> = {
  viewAllButton: cn(
    'rounded-md text-sm font-medium text-blue-600',
    'hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2'
  ),
};

export function TaskList({
  title,
  description,
  items,
  showClientName = true,
  viewAllHref,
  emptyMessage = 'No tienes tareas asignadas hoy',
}: TaskListProps) {
  const headingId = `tasklist-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      aria-labelledby={headingId}
      className="bg-surface rounded-xl border border-slate-200 p-5 shadow-sm"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2>{title}</h2>
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>
        <Link
          href={viewAllHref}
          className={styles.viewAllButton}
          aria-label={`Ver todas: ${title}`}
        >
          Ver todas
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li key={item.id} className="py-3 first:pt-0 last:pb-0">
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-4 rounded-md',
                  'focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                <time
                  dateTime={item.scheduledAtISO}
                  className="w-14 shrink-0 text-sm font-medium text-slate-600"
                >
                  {item.scheduledAtLabel}
                </time>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {item.serviceTypeName}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {item.boatName}
                    {showClientName ? ` · ${item.clientName}` : ''}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </Link>
            </li>
          ))}
          <Link
            href={viewAllHref}
            className={cn(styles.viewAllButton, 'mx-auto block w-fit pt-3')}
          >
            Ver todas mis tareas
          </Link>
        </ul>
      )}
    </section>
  );
}
