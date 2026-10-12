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
      className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>
        Mostrando {start} a {end} de {meta.total} solicitudes
      </p>

      <ul className="flex items-center justify-between gap-3 sm:hidden">
        <li>
          <StepLink href={meta.page > 1 ? buildHref(meta.page - 1) : undefined}>
            Anterior
          </StepLink>
        </li>
        <li>
          Página {meta.page} de {meta.totalPages}
        </li>
        <li>
          <StepLink
            href={
              meta.page < meta.totalPages ? buildHref(meta.page + 1) : undefined
            }
          >
            Siguiente
          </StepLink>
        </li>
      </ul>

      {/* Desde sm: números de página */}
      <ul className="hidden flex-wrap items-center gap-1 sm:flex">
        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <li key={page}>
              <Link
                href={buildHref(page)}
                aria-label={`Ir a la página ${page}`}
                aria-current={page === meta.page ? 'page' : undefined}
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

function StepLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const styles =
    'inline-flex min-h-10 items-center rounded-md border border-slate-200 px-4 font-medium';

  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        className={cn(styles, 'cursor-not-allowed opacity-50')}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(styles, 'text-slate-700 hover:bg-slate-100')}
    >
      {children}
    </Link>
  );
}
