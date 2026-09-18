import Link from 'next/link';

import type { PaginationMeta, ServiceRequestSearchParams } from '@/interfaces';
import { cn } from '@/lib/cn';

interface Props {
  meta: PaginationMeta;
  currentSearchParams: ServiceRequestSearchParams;
}

export function Pagination({ meta, currentSearchParams }: Props) {
  if (meta.totalPages <= 1) return null;

  const start = (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);

  const buildHref = (page: number) => {
    const params = new URLSearchParams(
      Object.entries(currentSearchParams).filter(([, v]) => v) as [
        string,
        string,
      ][]
    );

    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Navegación de solicitudes"
      className="mt-4 flex items-center justify-between text-sm text-slate-600"
    >
      <p>
        Mostrando {start} a {end} de {meta.total} solicitudes
      </p>
      <ul className="flex items-center gap-1">
        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <li key={page}>
              <Link
                href={buildHref(page)}
                aria-current={page === meta.page && 'page'}
                className={cn('rounded-md px-3 py-1', {
                  'bg-primary text-white': page === meta.page,
                  'hover:bg-slate-100': page !== meta.page,
                })}
              >
                {page}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
