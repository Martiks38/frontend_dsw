'use client';

import Link from 'next/link';

import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import { useSession } from '@/hooks/useSession.hook';
import { type TaskItem } from '@/interfaces/dashboard.interface';
import { cn } from '@/lib/cn';
import { formatTimeAR } from '@/utils/datetime.util';

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
  const session = useSession();
  const { user } = session;
  const headingId = `tasklist-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      aria-labelledby={headingId}
      className="bg-surface rounded-xl border border-slate-200 p-5 shadow-sm"
    >
      <div className="mb-4 flex items-baseline justify-between gap-2">
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
                  'xs:flex-row flex flex-col items-center rounded-md sm:gap-4',
                  'sx:space-y-0 space-y-2 focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {user?.role !== 'MEMBER' && (
                  <time
                    dateTime={item.scheduledAtISO}
                    className="max-xs:text-center w-14 shrink-0 text-sm font-medium text-slate-600"
                  >
                    {formatTimeAR(item.scheduledAtISO)}
                  </time>
                )}
                <div className="max-xs:text-center min-w-0 flex-1">
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
            Ver todas mis {user?.role === 'MEMBER' ? 'solicitudes' : 'tareas'}
          </Link>
        </ul>
      )}
    </section>
  );
}
