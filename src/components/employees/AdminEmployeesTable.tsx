'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { type EmployeeListItem } from '@/interfaces';
import { setEmployeeStatus } from '@/lib/account-status';
import { cn } from '@/lib/cn';

import { ToggleStatusButton } from '../ui/ToggleStatusButton/ToggleStatusButton';

export function AdminEmployeesTable({
  employees,
}: {
  employees: EmployeeListItem[];
}) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      employees.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      ),
    [employees, search]
  );

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex sm:justify-end">
        <Link
          href="/dashboard/empleados/nuevo"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:shrink-0"
        >
          + Nuevo empleado
        </Link>
      </div>

      <form
        role="search"
        aria-label="Buscar empleados"
        className="min-w-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="employee-search"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Buscar empleado
        </label>

        <input
          id="employee-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="min-h-11 w-full max-w-[35ch] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </form>

      {filtered.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm text-slate-500 ring-1 ring-slate-100 sm:p-6">
          No se encontraron empleados con estos filtros.
        </p>
      ) : (
        <>
          <ul
            role="list"
            aria-labelledby="empleados-heading"
            className="min-w-0 space-y-3 lg:hidden"
          >
            {filtered.map((e) => (
              <li
                key={e.publicId}
                className="max-w-150 min-w-0 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-100 sm:p-4"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="wrap-break-words font-semibold text-slate-900">
                      {e.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">{e.role}</p>
                  </div>

                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium',
                      e.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {e.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-sm">
                  <dt className="text-slate-500">ID</dt>
                  <dd className="min-w-0 break-all text-slate-700">
                    {e.publicId}
                  </dd>

                  <dt className="text-slate-500">Teléfono</dt>
                  <dd className="wrap-break-words min-w-0 text-slate-700">
                    {e.phoneNumber || 'No especificado'}
                  </dd>

                  <dt className="text-slate-500">Servicios asignados</dt>
                  <dd className="wrap-break-words min-w-0 text-slate-700">
                    {e.assignedServices}
                  </dd>
                </dl>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <ToggleStatusButton
                    isActive={e.isActive}
                    entityLabel="este empleado"
                    onToggle={(next) => setEmployeeStatus(e.publicId, next)}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-100 lg:block">
            <table
              className="w-full min-w-190 divide-y divide-slate-100 text-sm"
              aria-labelledby="empleados-heading"
            >
              <caption className="sr-only">Listado de empleados</caption>

              <thead className="bg-slate-50">
                <tr>
                  <Th>ID</Th>
                  <Th>Nombre</Th>
                  <Th>Rol</Th>
                  <Th>Teléfono</Th>
                  <Th>Estado</Th>
                  <Th>Servicios asignados</Th>
                  <Th>Acciones</Th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map((e) => (
                  <tr
                    key={e.publicId}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <Td className="max-w-32 break-all text-slate-500">
                      {e.publicId}
                    </Td>

                    <Td className="min-w-36 font-medium text-slate-700">
                      {e.name}
                    </Td>

                    <Td className="whitespace-nowrap text-slate-700">
                      {e.role}
                    </Td>

                    <Td className="whitespace-nowrap text-slate-700">
                      {e.phoneNumber || '—'}
                    </Td>

                    <Td>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                          e.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        )}
                      >
                        {e.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </Td>

                    <Td className="whitespace-nowrap text-slate-700">
                      {e.assignedServices}
                    </Td>

                    <Td>
                      <ToggleStatusButton
                        isActive={e.isActive}
                        entityLabel="este empleado"
                        onToggle={(next) => setEmployeeStatus(e.publicId, next)}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
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
