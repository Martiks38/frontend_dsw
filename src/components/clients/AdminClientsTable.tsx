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
  const { page, totalPages } = overview.meta;

  function applyParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const merged = { ...currentParams, ...next, page: next.page ?? '1' };

    for (const [key, value] of Object.entries(merged)) {
      if (value) params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex sm:justify-end">
        <Link
          href="/dashboard/clientes/nuevo"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:shrink-0"
        >
          + Nuevo cliente
        </Link>
      </div>

      <form
        role="search"
        aria-label="Buscar clientes"
        onSubmit={(e) => {
          e.preventDefault();
          applyParams({ search: search || undefined });
        }}
        className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
      >
        <div className="min-w-0">
          <label
            htmlFor="client-search"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Buscar cliente
          </label>

          <input
            id="client-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, email o teléfono..."
            className="min-h-11 w-full max-w-[35ch] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="client-status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Estado
          </label>

          <select
            id="client-status"
            value={currentParams.status ?? ''}
            onChange={(e) =>
              applyParams({ status: e.target.value || undefined })
            }
            className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none md:min-w-44"
          >
            <option value="">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="min-h-10 w-full rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none md:w-auto"
          >
            Buscar
          </button>
        </div>
      </form>

      {overview.data.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm text-slate-500 ring-1 ring-slate-100 sm:p-6">
          No se encontraron clientes con estos filtros.
        </p>
      ) : (
        <>
          <ul
            role="list"
            aria-labelledby="clientes-heading"
            className="space-y-3 lg:hidden"
          >
            {overview.data.map((c) => (
              <li
                key={c.publicId}
                className="min-w-0 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="wrap-break-words font-semibold text-slate-900">
                      {c.name}
                    </p>

                    <p className="mt-1 text-sm break-all text-slate-600">
                      {c.email}
                    </p>
                  </div>

                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium',
                      c.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {c.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-sm">
                  <dt className="text-slate-500">ID</dt>
                  <dd className="min-w-0 break-all text-slate-700">
                    {c.publicId}
                  </dd>

                  <dt className="text-slate-500">Teléfono</dt>
                  <dd className="wrap-break-words min-w-0 text-slate-700">
                    {c.phoneNumber || 'No especificado'}
                  </dd>
                </dl>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <ToggleStatusButton
                    isActive={c.isActive}
                    entityLabel="este cliente"
                    onToggle={(next) => setClientStatus(c.publicId, next)}
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Desde lg: tabla */}
          <div className="hidden overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-100 lg:block">
            <table
              className="w-full min-w-190 divide-y divide-slate-100 text-sm"
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
                  <tr
                    key={c.publicId}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <Td className="max-w-32 break-all text-slate-500">
                      {c.publicId}
                    </Td>

                    <Td className="min-w-36 font-medium text-slate-700">
                      {c.name}
                    </Td>

                    <Td className="min-w-48 break-all text-slate-700">
                      {c.email}
                    </Td>

                    <Td className="whitespace-nowrap text-slate-700">
                      {c.phoneNumber || '—'}
                    </Td>

                    <Td>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
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
        </>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Paginación de clientes"
          className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm text-slate-500">
            Página {page} de {totalPages}
          </p>

          {/* Mobile: anterior / siguiente */}
          <div className="flex items-center gap-3 md:hidden">
            <StepButton
              disabled={page <= 1}
              onClick={() => applyParams({ page: String(page - 1) })}
            >
              Anterior
            </StepButton>
            <StepButton
              disabled={page >= totalPages}
              onClick={() => applyParams({ page: String(page + 1) })}
            >
              Siguiente
            </StepButton>
          </div>

          {/* Desde md: números de página */}
          <div className="hidden max-w-full items-center gap-1 overflow-x-auto py-1 md:flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyParams({ page: String(p) })}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Ir a la página ${p}`}
                className={cn(
                  'inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
                  p === page
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </nav>
      )}

      <section aria-label="Resumen de clientes" className="min-w-0">
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
      </section>
    </div>
  );
}

function StepButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left font-medium whitespace-nowrap text-slate-600"
    >
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
  return (
    <td className={cn('px-4 py-3 align-middle', className)}>{children}</td>
  );
}
