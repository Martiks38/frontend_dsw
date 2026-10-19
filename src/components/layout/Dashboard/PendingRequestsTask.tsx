import { Eye } from 'lucide-react';
import Link from 'next/link';

import { Td, Th } from '@/components/ui/Table';
import { type PendingRequestRow } from '@/interfaces/dashboard.interface';
import { cn } from '@/lib/cn';
import { formatDateTimeAR } from '@/utils/datetime.util';

interface ColumnHeader {
  label: string;
  isSrOnly?: boolean;
}

interface PendingRequestsTableProps extends React.ComponentPropsWithRef<'section'> {
  rows: PendingRequestRow[];
}

const COLUMN_HEADERS: ColumnHeader[] = [
  { label: 'ID' },
  { label: 'Cliente' },
  { label: 'Embarcación' },
  { label: 'Fecha' },
  { label: 'Acciones', isSrOnly: true },
];

export function PendingRequestsTable({
  rows,
  className,
}: PendingRequestsTableProps) {
  return (
    <section
      aria-labelledby="pending-req-heading"
      className={cn('xs:min-w-90 w-full', className)}
    >
      <h2
        id="pending-req-heading"
        className="mb-4 text-base font-semibold text-slate-900"
      >
        Solicitudes pendientes
      </h2>

      <ul
        role="list"
        aria-labelledby="pending-req-heading"
        className="space-y-3 md:hidden"
      >
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-lg bg-white p-4 ring-1 ring-slate-100"
          >
            <div className="flex items-center gap-3">
              <p className="font-semibold wrap-break-word text-slate-900">
                {row.clientName}
              </p>
              <span className="text-sm text-slate-500">#{row.id}</span>
            </div>

            <dl className="xs:grid-cols-[auto_1fr] xs:gap-y-2 max-xs:[&>dd]:mb-2.5 mt-3 grid grid-cols-1 gap-x-4 text-sm">
              <dt className="text-slate-500">Embarcación</dt>
              <dd className="wrap-break-word text-slate-700">{row.boatName}</dd>
              <dt className="text-slate-500">Fecha</dt>
              <dd className="text-slate-700">
                <time dateTime={row.dateISO}>
                  {formatDateTimeAR(row.dateISO)}
                </time>
              </dd>
            </dl>

            <Link
              href={row.href}
              aria-label={`Ver solicitud #${row.id} de ${row.clientName}`}
              className="xs:mt-3 inline-flex min-h-10 items-center gap-2 rounded text-sm font-medium text-blue-600 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              Ver detalle
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Solicitudes pendientes de asignación, con cliente, embarcación y
            fecha
          </caption>
          <thead>
            <tr>
              {COLUMN_HEADERS.map(({ label, isSrOnly }) => (
                <Th scope="col" key={label}>
                  <span className={isSrOnly ? 'sr-only' : ''}>{label}</span>
                </Th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <Td className="text-slate-500">#{row.id}</Td>
                <Td className="text-slate-900">{row.clientName}</Td>
                <Td className="text-slate-900">{row.boatName}</Td>
                <Td className="text-slate-500">
                  <time dateTime={row.dateISO}>
                    {formatDateTimeAR(row.dateISO)}
                  </time>
                </Td>
                <Td>
                  <Link
                    href={row.href}
                    aria-label={`Ver solicitud #${row.id} de ${row.clientName}`}
                    className="inline-flex rounded p-1 text-slate-500 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
