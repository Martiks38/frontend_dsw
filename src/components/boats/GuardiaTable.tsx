'use client';

import { useMemo, useState } from 'react';

// import { StatCard, StatGrid } from '@/components/ui/StatCard/StatCard';
import { BoatStatusBadge } from '@/components/ui/StatusBadge/BoatStatusBadge';
import { type GuardiaOverview } from '@/interfaces';
import { cn } from '@/lib/cn';

export function GuardiaTable({ overview }: { overview: GuardiaOverview }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return overview.data;
    return overview.data.filter(
      (boat) =>
        boat.name.toLowerCase().includes(search.toLowerCase()) ||
        boat.registrationNumber.toLowerCase().includes(search.toLowerCase())
    );
  }, [overview.data, search]);

  return (
    <div>
      <header>
        <h1
          id="guarderia-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Guardería
        </h1>
        <p className="text-sm text-slate-500">
          Embarcaciones actualmente en guardería.
        </p>
      </header>

      <form role="search" aria-label="Buscar embarcación" className="mt-4">
        <label htmlFor="guardia-search" className="sr-only">
          Buscar embarcación
        </label>
        <input
          id="guardia-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar embarcación..."
          className="w-full max-w-sm rounded-md border-slate-300 text-sm"
        />
      </form>

      {filtered.length === 0 ? (
        <p className="m-6 text-sm text-slate-500">
          No se encontraron embarcaciones con estos filtros.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-slate-100">
          <table
            className="min-w-full divide-y divide-slate-100 text-sm"
            aria-labelledby="guarderia-heading"
          >
            <caption className="sr-only">Embarcaciones en guardería</caption>
            <thead className="bg-slate-50">
              <tr>
                <Th>Matrícula</Th>
                <Th>Nombre</Th>
                <Th>Sector</Th>
                <Th>Salida prevista</Th>
                <Th>Estado</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((boat) => (
                <tr key={boat.id}>
                  <Td className="text-slate-700">{boat.registrationNumber}</Td>
                  <Td className="text-slate-700">{boat.name}</Td>
                  <Td className="text-slate-700">{boat.cradleCode ?? '—'}</Td>
                  <Td className="text-slate-700">
                    {boat.plannedEndDatetimeLabel ?? 'Sin definir'}
                  </Td>
                  <Td>
                    <BoatStatusBadge status={boat.status} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <StatGrid heading="Resumen de guardería">
        <StatCard
          label="Total en guardería"
          value={overview.stats.totalEnGuardia}
          iconName="anchor"
        />
        <StatCard
          label="Sectores ocupados"
          value={`${overview.stats.occupiedCradles} / ${overview.stats.totalCradles}`}
          iconName="anchor"
          accent="blue"
        />
        <StatCard
          label="Próximas salidas"
          value={overview.stats.upcomingDepartures}
          helperText="30 días"
          accent="amber"
        />
        <StatCard
          label="Estadía promedio"
          value={`${overview.stats.avgStayDays} días`}
          accent="green"
        />
      </StatGrid> */}
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
