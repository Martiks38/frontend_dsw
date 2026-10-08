'use client';

import { UserCheck, UserPlus, Users, UserX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { type ClientsOverview } from '@/interfaces';
import { setClientStatus } from '@/lib/account-status';
import { cn } from '@/lib/cn';

import { ToggleStatusButton } from '../ui/ToggleStatusButton/ToggleStatusButton';

interface Props {
  overview: ClientsOverview;
  currentParams: { page?: string; search?: string; status?: string };
}

export function AdminClientsTable({ overview, currentParams }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentParams.search ?? '');

  function applyParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const merged = { ...currentParams, ...next, page: next.page ?? '1' };
    for (const [key, value] of Object.entries(merged)) {
      if (value) params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1
            id="clientes-heading"
            className="text-xl font-semibold text-slate-900"
          >
            Clientes
          </h1>
          <p className="text-sm text-slate-500">
            Gestioná la información de los clientes.
          </p>
        </div>
        <Link
          href="/clientes/nuevo"
          className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nuevo cliente
        </Link>
      </header>

      <form
        role="search"
        aria-label="Buscar clientes"
        onSubmit={(e) => {
          e.preventDefault();
          applyParams({ search: search || undefined });
        }}
        className="mt-4 flex flex-wrap gap-3"
      >
        <label htmlFor="client-search" className="sr-only">
          Buscar cliente
        </label>
        <input
          id="client-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar cliente..."
          className="w-full max-w-sm rounded-md border-slate-300 text-sm"
        />
        <select
          value={currentParams.status ?? ''}
          onChange={(e) => applyParams({ status: e.target.value || undefined })}
          aria-label="Filtrar por estado"
          className="rounded-md border-slate-300 text-sm"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </form>

      {overview.data.length === 0 ? (
        <p className="m-6 text-sm text-slate-500">
          No se encontraron clientes con estos filtros.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-slate-100">
          <table
            className="min-w-full divide-y divide-slate-100 text-sm"
            aria-labelledby="clientes-heading"
          >
            <caption className="sr-only">Listado de clientes</caption>
            <thead className="bg-slate-50">
              <tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th>Teléfono</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overview.data.map((c) => (
                <tr key={c.publicId}>
                  <Td className="text-slate-500">{c.publicId}</Td>
                  <Td className="text-slate-700">{c.name}</Td>
                  <Td className="text-slate-700">{c.email}</Td>
                  <Td className="text-slate-700">{c.phoneNumber}</Td>
                  <Td>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        c.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      )}
                    >
                      {c.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </Td>
                  <Td>
                    <ToggleStatusButton
                      isActive={c.isActive}
                      entityLabel="este cliente"
                      onToggle={(next) => setClientStatus(c.publicId, next)}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {overview.meta.totalPages > 1 && (
        <nav
          aria-label="Paginación de clientes"
          className="mt-4 flex gap-1 text-sm"
        >
          {Array.from(
            { length: overview.meta.totalPages },
            (_, i) => i + 1
          ).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => applyParams({ page: String(p) })}
              aria-current={p === overview.meta.page ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-1',
                p === overview.meta.page
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-100'
              )}
            >
              {p}
            </button>
          ))}
        </nav>
      )}

      <StatGrid heading="Resumen">
        <StatCard
          label="Total clientes"
          value={overview.stats.total}
          icon={Users}
        />
        <StatCard
          label="Clientes activos"
          value={overview.stats.active}
          icon={UserCheck}
          accent="green"
        />
        <StatCard
          label="Clientes inactivos"
          value={overview.stats.inactive}
          icon={UserX}
          accent="red"
        />
        <StatCard
          label="Nuevos este mes"
          value={overview.stats.newThisMonth}
          icon={UserPlus}
          accent="blue"
        />
      </StatGrid>
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
