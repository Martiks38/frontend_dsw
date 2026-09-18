import Link from 'next/link';

import { ServiceRequestRow } from '@/interfaces';
import { cn } from '@/lib/cn';

import { StatusBadge } from '../StatusBadge/StatusBadge';

export function ServiceRequestsTable({
  rows,
  headingId,
}: {
  rows: ServiceRequestRow[];
  headingId: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="m-6 text-sm text-slate-500">
        No se encontraron solicitudes con estos filtros.
      </p>
    );
  }

  return (
    <div className="overflow-x mt-6 rounded-lg ring-1 ring-slate-100">
      <table
        className="min-w-full divide-y divide-slate-100 text-sm"
        aria-labelledby={headingId}
      >
        <caption className="sr-only">
          Listado de tus solicitudes de servicio
        </caption>

        <thead className="bg-slate-50">
          <tr>
            <Th scope="col">Servicio</Th>
            <Th scope="col">Embarcación</Th>
            <Th scope="col">Fecha</Th>
            <Th scope="col">Estado</Th>
            <Th scope="col">
              <span className="sr-only">Acciones</span>
            </Th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.id}>
              <Td className="text-slate-700">{r.serviceTypeName}</Td>
              <Td className="text-slate-700">{r.boatName}</Td>
              <Td className="text-slate-700">
                <time dateTime={r.dateISO}>{r.dateLabel}</time>
              </Td>
              <Td>
                <StatusBadge status={r.status} />
              </Td>
              <Td>
                <Link
                  href={r.href}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Ver detalle
                </Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  scope,
  children,
}: {
  scope: string;
  children?: React.ReactNode;
}) {
  return (
    <th
      scope={scope}
      className="px-4 py-3 text-left font-medium text-slate-600"
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <td className={cn('px-4 py-3', className)}>{children}</td>;
}
