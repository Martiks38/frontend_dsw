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
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1
            id="empleados-heading"
            className="text-xl font-semibold text-slate-900"
          >
            Empleados
          </h1>
          <p className="text-sm text-slate-500">Gestión del personal.</p>
        </div>
        <Link
          href="/empleados/nuevo"
          className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nuevo empleado
        </Link>
      </header>

      <form role="search" aria-label="Buscar empleados" className="mt-4">
        <label htmlFor="employee-search" className="sr-only">
          Buscar empleado
        </label>
        <input
          id="employee-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar empleado..."
          className="w-full max-w-sm rounded-md border-slate-300 text-sm"
        />
      </form>

      {filtered.length === 0 ? (
        <p className="m-6 text-sm text-slate-500">
          No se encontraron empleados con estos filtros.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-slate-100">
          <table
            className="min-w-full divide-y divide-slate-100 text-sm"
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
                <tr key={e.publicId}>
                  <Td className="text-slate-500">{e.publicId}</Td>
                  <Td className="text-slate-700">{e.name}</Td>
                  <Td className="text-slate-700">{e.role}</Td>
                  <Td className="text-slate-700">{e.phoneNumber}</Td>
                  <Td>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        e.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      )}
                    >
                      {e.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </Td>
                  <Td className="text-slate-700">{e.assignedServices}</Td>
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
