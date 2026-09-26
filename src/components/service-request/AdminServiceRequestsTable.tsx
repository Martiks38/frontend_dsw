'use client';

import { Eye, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type {
  RequestStatus,
  ServiceRequestRow,
  StatusCounts,
} from '@/interfaces';
import { cn } from '@/lib/cn';

import { StatusBadge } from '../ui/StatusBadge/StatusBadge';

const TABS: { key: RequestStatus | 'ALL'; label: string }[] = [
  { key: 'ALL', label: 'Todas' },
  { key: 'PENDING', label: 'Pendientes' },
  { key: 'SCHEDULED', label: 'Programadas' },
  { key: 'IN_PROGRESS', label: 'En proceso' },
  { key: 'COMPLETED', label: 'Completadas' },
  { key: 'CANCELED', label: 'Canceladas' },
];

interface Props {
  rows: ServiceRequestRow[];
  statusCounts?: StatusCounts;
  currentStatus?: string;
  currentSearch?: string;
}

export function AdminServiceRequestsTable({
  rows,
  statusCounts,
  currentStatus,
  currentSearch,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch ?? '');

  function applyParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyParams({ search: search || undefined });
  }

  function handleTabClick(key: RequestStatus | 'ALL') {
    applyParams({ status: key === 'ALL' ? undefined : key });
  }

  const activeTab = currentStatus ?? 'ALL';

  return (
    <div>
      <form
        onSubmit={handleSearchSubmit}
        role="search"
        aria-label="Buscar solicitudes"
        className="mt-4"
      >
        <label htmlFor="admin-search" className="sr-only">
          Buscar solicitud
        </label>
        <input
          id="admin-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar solicitud..."
          className="w-full max-w-md rounded-md border-slate-300 text-sm"
        />
      </form>

      <nav aria-label="Filtrar por estado" className="mt-4">
        <ul className="flex flex-wrap gap-2 border-b border-slate-200 text-sm">
          {TABS.map((tab) => {
            const count =
              statusCounts?.[tab.key === 'ALL' ? 'ALL' : tab.key] ?? 0;
            const isActive = activeTab === tab.key;
            return (
              <li key={tab.key}>
                <button
                  type="button"
                  onClick={() => handleTabClick(tab.key)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'border-b-2 px-3 py-2 font-medium',
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  )}
                >
                  {tab.label}{' '}
                  {statusCounts ? (
                    <span className="text-slate-400">{count}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {rows.length === 0 ? (
        <p className="m-6 text-sm text-slate-500">
          No se encontraron solicitudes con estos filtros.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-slate-100">
          <table
            className="min-w-full divide-y divide-slate-100 text-sm"
            aria-label="Listado de solicitudes"
          >
            <thead className="bg-slate-50">
              <tr>
                <Th>ID</Th>
                <Th>Tipo</Th>
                <Th>Embarcación</Th>
                <Th>Solicitante</Th>
                <Th>Fecha</Th>
                <Th>Estado</Th>
                <Th>
                  <span className="sr-only">Acciones</span>
                </Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id}>
                  <Td className="text-slate-500">#{r.id}</Td>
                  <Td className="text-slate-700">{r.serviceTypeName}</Td>
                  <Td className="text-slate-700">{r.boatName}</Td>
                  <Td className="text-slate-700">{r.clientName}</Td>
                  <Td className="text-slate-700">
                    <time dateTime={r.dateISO}>{r.dateLabel}</time>
                  </Td>
                  <Td>
                    <StatusBadge status={r.status} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <Link
                        href={r.href}
                        aria-label={`Ver detalle de la solicitud #${r.id}`}
                        className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </Link>

                      <details className="relative">
                        <summary
                          aria-label={`Más acciones para la solicitud #${r.id}`}
                          className="flex cursor-pointer list-none items-center rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreVertical
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </summary>
                        <ul className="absolute right-0 z-10 mt-1 w-44 rounded-md border border-slate-200 bg-white py-1 shadow-lg">
                          <li>
                            <Link
                              href={r.href}
                              className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              Ver detalle
                            </Link>
                          </li>
                          {(r.status === 'PENDING' ||
                            r.status === 'SCHEDULED') && (
                            <li>
                              <Link
                                href={`${r.href}?accion=asignar`}
                                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                Asignar operario
                              </Link>
                            </li>
                          )}
                        </ul>
                      </details>
                    </div>
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
