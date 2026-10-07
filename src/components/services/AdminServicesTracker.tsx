'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import type { RequestStatus, ServiceRequestRow } from '@/interfaces';
import { cn } from '@/lib/cn';

const TABS: { key: RequestStatus; label: string }[] = [
  { key: 'IN_PROGRESS', label: 'En proceso' },
  { key: 'SCHEDULED', label: 'Programados' },
  { key: 'COMPLETED', label: 'Completados' },
];

interface Props {
  rows: ServiceRequestRow[];
  currentStatus: string;
  currentSearch?: string;
}

export function AdminServicesTracker({
  rows,
  currentStatus,
  currentSearch,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch ?? '');

  function applyParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams({
      status: currentStatus,
      ...(currentSearch && { search: currentSearch }),
    });
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      <header>
        <h1
          id="servicios-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Servicios
        </h1>
        <p className="text-sm text-slate-500">
          Seguimiento de servicios y operaciones.
        </p>
      </header>

      <nav aria-label="Filtrar por estado" className="mt-4">
        <ul className="flex gap-2 border-b border-slate-200 text-sm">
          {TABS.map((tab) => (
            <li key={tab.key}>
              <button
                type="button"
                onClick={() => applyParams({ status: tab.key })}
                aria-current={currentStatus === tab.key ? 'true' : undefined}
                className={cn(
                  'border-b-2 px-3 py-2 font-medium',
                  currentStatus === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500'
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <form
        role="search"
        aria-label="Buscar servicios"
        onSubmit={(e) => {
          e.preventDefault();
          applyParams({ search: search || undefined });
        }}
        className="mt-4"
      >
        <label htmlFor="service-search" className="sr-only">
          Buscar servicio
        </label>
        <input
          id="service-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar servicio..."
          className="w-full max-w-sm rounded-md border-slate-300 text-sm"
        />
      </form>

      {rows.length === 0 ? (
        <p className="m-6 text-sm text-slate-500">
          No hay servicios en este estado.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-slate-100">
          <table
            className="min-w-full divide-y divide-slate-100 text-sm"
            aria-labelledby="servicios-heading"
          >
            <caption className="sr-only">Seguimiento de servicios</caption>
            <thead className="bg-slate-50">
              <tr>
                <Th>Embarcación</Th>
                <Th>Servicio</Th>
                <Th>Operador</Th>
                <Th>Inicio</Th>
                <Th>Estado</Th>
                <Th>
                  <span className="sr-only">Acciones</span>
                </Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id}>
                  <Td className="text-slate-700">{r.boatName}</Td>
                  <Td className="text-slate-700">{r.serviceTypeName}</Td>
                  <Td className="text-slate-700">{r.employeeName ?? '—'}</Td>
                  <Td className="text-slate-700">
                    <time dateTime={r.dateISO}>{r.dateLabel}</time>
                  </Td>
                  <Td>
                    <StatusBadge status={r.status} />
                  </Td>
                  <Td>
                    <a
                      href={r.href}
                      aria-label={`Ver detalle de ${r.serviceTypeName}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </a>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th scope="col" className="px-4 py-3 text-left font-medium text-slate-600">
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <td className={cn('px-4 py-3', className)}>{children}</td>;
}
