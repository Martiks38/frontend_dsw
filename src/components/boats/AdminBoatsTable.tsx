'use client';

import { Anchor, Ship, Waves, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';

import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { BoatStatusBadge } from '@/components/ui/StatusBadge/BoatStatusBadge';
import type { BoatAdminStatus, BoatsAdminOverview } from '@/interfaces';

const STATUS_OPTIONS: { value: BoatAdminStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Todos los estados' },
  { value: 'EN_GUARDIA', label: 'En guardería' },
  { value: 'EN_AGUA', label: 'En agua' },
  { value: 'EN_MANTENIMIENTO', label: 'En mantenimiento' },
];

export function AdminBoatsTable({
  overview,
}: {
  overview: BoatsAdminOverview;
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BoatAdminStatus | 'ALL'>(
    'ALL'
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return overview.data.filter((boat) => {
      const matchesStatus =
        statusFilter === 'ALL' || boat.status === statusFilter;
      const matchesSearch =
        !term ||
        boat.name.toLowerCase().includes(term) ||
        boat.registrationNumber.toLowerCase().includes(term) ||
        boat.ownerName.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [overview.data, search, statusFilter]);

  return (
    <div className="xs:min-w-90 w-full">
      <form
        role="search"
        aria-label="Buscar embarcaciones"
        onSubmit={(e) => e.preventDefault()}
        className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap"
      >
        <div className="sm:flex-1">
          <label htmlFor="boat-search" className="sr-only">
            Buscar embarcación
          </label>
          <input
            id="boat-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar embarcación..."
            className="w-full rounded-md border border-slate-300 p-2 text-sm sm:max-w-sm"
          />
        </div>
        <div>
          <label htmlFor="status-filter" className="sr-only">
            Filtrar por estado
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as BoatAdminStatus | 'ALL')
            }
            className="w-full rounded-md border-slate-300 text-sm sm:w-auto"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      {filtered.length === 0 ? (
        <p className="m-6 text-sm text-slate-500">
          No se encontraron embarcaciones con estos filtros.
        </p>
      ) : (
        <div className="my-6">
          <ul
            role="list"
            aria-labelledby="embarcaciones-heading"
            className="mt-4 space-y-3 md:hidden"
          >
            {filtered.map((boat) => (
              <li
                key={boat.id}
                className="rounded-lg bg-white p-4 ring-1 ring-slate-100"
              >
                <div className="max-xs:mb-2 max-xs:items-center xs:flex-row flex flex-col items-start justify-between gap-3">
                  <p className="min-w-0 font-semibold wrap-break-word text-slate-800">
                    {boat.name}
                  </p>
                  <div className="shrink-0">
                    <BoatStatusBadge status={boat.status} />
                  </div>
                </div>

                <dl className="xs:grid-cols-[auto_1fr] xs:gap-y-2 max-xs:[&>dd]:mb-2.5 mt-3 grid grid-cols-1 gap-x-4 text-sm">
                  <Dt>Matrícula</Dt>
                  <Dd>{boat.registrationNumber}</Dd>
                  <Dt>Propietario</Dt>
                  <Dd>{boat.ownerName}</Dd>
                  <Dt>Tipo</Dt>
                  <Dd>{boat.boatTypeName}</Dd>
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-4 hidden overflow-x-auto rounded-lg ring-1 ring-slate-100 md:block">
            <table
              className="min-w-full divide-y divide-slate-100 text-sm"
              aria-labelledby="embarcaciones-heading"
            >
              <caption className="sr-only">
                Listado de embarcaciones registradas
              </caption>
              <thead className="bg-slate-50">
                <tr>
                  <Th>Matrícula</Th>
                  <Th>Nombre</Th>
                  <Th>Propietario</Th>
                  <Th>Tipo</Th>
                  <Th>Estado</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((boat) => (
                  <tr key={boat.id}>
                    <Td>{boat.registrationNumber}</Td>
                    <Td>{boat.name}</Td>
                    <Td>{boat.ownerName}</Td>
                    <Td>{boat.boatTypeName}</Td>
                    <Td>
                      <BoatStatusBadge status={boat.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <StatGrid heading="Resumen">
        <StatCard
          label="Total embarcaciones"
          value={overview.stats.total}
          icon={Ship}
        />
        <StatCard
          label="En agua"
          value={overview.stats.enAgua}
          icon={Waves}
          accent="blue"
        />
        <StatCard
          label="En guardería"
          value={overview.stats.enGuardia}
          icon={Anchor}
          accent="green"
        />
        <StatCard
          label="En mantenimiento"
          value={overview.stats.enMantenimiento}
          icon={Wrench}
          accent="amber"
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

function Td({ children }: { children?: React.ReactNode }) {
  return <td className="px-4 py-3 text-slate-700">{children}</td>;
}

function Dt({ children }: { children?: React.ReactNode }) {
  return <dt className="text-slate-500">{children}</dt>;
}

function Dd({ children }: { children?: React.ReactNode }) {
  return <dd className="min-w-0 wrap-break-word text-slate-700">{children}</dd>;
}
