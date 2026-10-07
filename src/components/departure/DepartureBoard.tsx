'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import { type ServiceRequestRow } from '@/interfaces';

export function DepartureBoard({
  rows,
  currentSearch,
}: {
  rows: ServiceRequestRow[];
  currentSearch?: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header>
        <h1 className="text-xl font-semibold text-slate-900">
          Ingreso / Retiro
        </h1>
        <p className="text-sm text-slate-500">
          Buscá una embarcación para registrar su salida o regreso.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Buscar embarcación"
        className="mt-4"
      >
        <label htmlFor="boat-search" className="sr-only">
          Buscar por embarcación o cliente
        </label>
        <input
          id="boat-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por embarcación o cliente..."
          className="w-full rounded-md border-slate-300 text-sm"
        />
      </form>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          No hay embarcaciones pendientes de salida o retorno.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={r.href}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100 hover:ring-blue-300"
              >
                <div>
                  <p className="font-medium text-slate-900">{r.boatName}</p>
                  {/* // ! Ver por que no viene el nombre del cliente */}
                  <p className="text-sm text-slate-500">{r.clientName}</p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
