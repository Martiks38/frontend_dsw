'use client';

import { CircleCheck, Loader2, Sailboat, Search, User } from 'lucide-react';
import { useRef, useState } from 'react';

import { actions } from '@/app/actions';
import { type BoatSearchResult } from '@/interfaces';

import { DepartureDialog } from './DepartureDialog';

const { findBoatsAction } = actions.boat;

export function DepartureTab() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BoatSearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<BoatSearchResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  async function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term || searching) return;

    setSearching(true);
    setError(null);
    setNotice(null);

    try {
      const result = await findBoatsAction(term);
      if (result.success) {
        setResults(result.data ?? []);
      } else {
        setResults(null);
        setError(result.errorMessage ?? 'No se pudo realizar la búsqueda.');
      }
    } catch {
      setResults(null);
      setError('No se pudo realizar la búsqueda. Intentá nuevamente.');
    } finally {
      setSearching(false);
    }
  }

  function handleDepartureSuccess(boat: BoatSearchResult) {
    setSelected(null);
    setResults((prev) =>
      prev ? prev.filter((b) => b.publicId !== boat.publicId) : prev
    );

    setNotice(`Salida de "${boat.name}" registrada correctamente.`);

    searchRef.current?.focus();
  }

  let summary = '';
  if (searching) {
    summary = 'Buscando embarcaciones…';
  } else if (results !== null) {
    summary =
      results.length === 0
        ? `No se encontraron embarcaciones para "${query.trim()}".`
        : `${results.length} ${
            results.length === 1
              ? 'embarcación encontrada'
              : 'embarcaciones encontradas'
          }.`;
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSearch}
        role="search"
        className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
      >
        <label htmlFor="boat-search" className="sr-only">
          Código del bote o propietario
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            ref={searchRef}
            id="boat-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Código del bote o propietario"
            maxLength={100}
            className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-9 text-sm text-slate-900 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          />
        </div>
        <button
          type="submit"
          aria-disabled={searching || !query.trim()}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none aria-disabled:opacity-60"
        >
          {searching ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          Buscar
        </button>
      </form>

      <p role="status" className="sr-only">
        {summary}
      </p>

      <div role="status">
        {notice ? (
          <p className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
            {notice}
          </p>
        ) : null}
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      {results === null && !error ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
          Buscá una embarcación por su código, nombre, matrícula o propietario
          para registrar su salida.
        </p>
      ) : null}

      {results !== null && results.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
          No se encontraron embarcaciones para &quot;{query.trim()}&quot;.
        </p>
      ) : null}

      {results && results.length > 0 ? (
        <ul
          role="list"
          aria-label="Embarcaciones encontradas"
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {results.map((boat) => (
            <li
              key={boat.publicId}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Sailboat className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold wrap-break-word text-slate-900">
                    {boat.name}
                  </h3>
                  <p className="text-sm wrap-break-word text-slate-500">
                    {[boat.model, boat.registrationNumber]
                      .filter(Boolean)
                      .join(' · ') || boat.publicId}
                  </p>
                  {boat.ownerName ? (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                      <User className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Propietario: </span>
                      {boat.ownerName}
                    </p>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(boat)}
                aria-label={`Registrar salida de ${boat.name}`}
                className="min-h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              >
                Registrar salida
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <DepartureDialog
        boat={selected}
        onClose={() => setSelected(null)}
        onSuccess={handleDepartureSuccess}
      />
    </div>
  );
}
