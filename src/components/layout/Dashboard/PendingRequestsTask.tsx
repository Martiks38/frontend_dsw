import Link from 'next/link';

import Icon from '@/components/ui/Icon/Icon';
import { Td, Th } from '@/components/ui/Table';
import { type PendingRequestRow } from '@/interfaces/dashboard.interface';

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
    <section aria-labelledby="pending-req-heading" className={className}>
      <h2
        id="pending-req-heading"
        className="mb-4 text-base font-semibold text-slate-900"
      >
        Solicitudes pendientes
      </h2>
      <div className="overflow-x-auto">
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
                  <time dateTime={row.dateISO}>{row.dateLabel}</time>
                </Td>
                <Td>
                  <Link
                    href={row.href}
                    aria-label={`Ver solicitud #${row.id} de ${row.clientName}`}
                    className="inline-flex rounded p-1 text-slate-500 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
                  >
                    <Icon id="eye" className="h-4 w-4" />
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
