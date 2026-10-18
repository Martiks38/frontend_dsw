import Link from 'next/link';

import { ServiceRequestRow } from '@/interfaces';
import { cn } from '@/lib/cn';
import { formatDateTimeAR } from '@/utils/datetime.util';

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
    <>
      <ul
        role="list"
        aria-labelledby={headingId}
        className="mt-6 space-y-3 md:hidden"
      >
        {rows.map((r) => (
          <li
            key={r.id}
            className="rounded-lg bg-white p-4 ring-1 ring-slate-100"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 font-semibold text-slate-800">
                {r.serviceTypeName}
              </p>
              <div className="shrink-0">
                <StatusBadge status={r.status} />
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-slate-500">Embarcación</dt>
              <dd className="text-slate-700">{r.boatName}</dd>
              <dt className="text-slate-500">Fecha</dt>
              <dd className="text-slate-700">
                <time dateTime={r.dateISO}>{formatDateTimeAR(r.dateISO)}</time>
              </dd>
            </dl>

            <Link
              href={r.href}
              aria-label={`Ver detalle de ${r.serviceTypeName} del ${formatDateTimeAR(r.dateISO)}`}
              className="mt-3 inline-flex min-h-10 items-center rounded text-sm font-medium text-blue-600 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            >
              Ver detalle
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden overflow-x-auto rounded-lg ring-1 ring-slate-100 md:block">
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
                  <time dateTime={r.dateISO}>
                    {formatDateTimeAR(r.dateISO)}
                  </time>
                </Td>
                <Td>
                  <StatusBadge status={r.status} />
                </Td>
                <Td>
                  <Link
                    href={r.href}
                    aria-label={`Ver detalle de ${r.serviceTypeName} del ${formatDateTimeAR(r.dateISO)}`}
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
    </>
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
