'use client';

import {
  AlertTriangle,
  Anchor,
  CircleCheck,
  Loader2,
  RefreshCw,
  Search,
  User,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { actions } from '@/app/actions';
import { type ActiveDeparture } from '@/interfaces';
import { cn } from '@/lib/cn';
import { formatDateTimeAR } from '@/utils/datetime.util';

const { listActiveDeparturesAction, registerReturnAction } =
  actions.boatDeparture;

export function ReturnTab() {
  const [departures, setDepartures] = useState<ActiveDeparture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [returningId, setReturningId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const filterRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);

    setError(null);

    try {
      const result = await listActiveDeparturesAction();
      if (result.success) setDepartures(result.data ?? []);
      else {
        setError(
          result.errorMessage ??
            'No se pudo cargar la lista de embarcaciones en el agua.'
        );
      }
    } catch {
      setError('No se pudo cargar la lista de embarcaciones en el agua.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return departures;
    return departures.filter((d) =>
      [d.boatName, d.registrationNumber, d.ownerName, d.publicId].some((v) =>
        v.toLowerCase().includes(term)
      )
    );
  }, [departures, filter]);

  async function handleReturn(departure: ActiveDeparture) {
    if (returningId !== null) return;

    setReturningId(departure.boatDepartureId);
    setActionError(null);
    setNotice(null);

    try {
      const result = await registerReturnAction(departure.boatDepartureId);
      if (result.success) {
        setDepartures((prev) =>
          prev.filter((d) => d.boatDepartureId !== departure.boatDepartureId)
        );

        setNotice(
          `Retorno de "${departure.boatName}" registrado correctamente.`
        );

        filterRef.current?.focus();
      } else {
        setActionError(
          result.errorMessage ??
            `No se pudo registrar el retorno de "${departure.boatName}".`
        );
      }
    } catch {
      setActionError(
        `No se pudo registrar el retorno de "${departure.boatName}".`
      );
    } finally {
      setReturningId(null);
    }
  }

  let summary = '';
  if (loading && departures.length === 0) {
    summary = 'Cargando embarcaciones en el agua…';
  } else if (!error) {
    if (departures.length === 0) {
      summary = 'No hay embarcaciones navegando en este momento.';
    } else if (filtered.length === 0) {
      summary = `Ninguna embarcación coincide con "${filter.trim()}".`;
    } else {
      summary = `${filtered.length} ${
        filtered.length === 1 ? 'embarcación' : 'embarcaciones'
      } en el agua.`;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        role="search"
        className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
      >
        <label htmlFor="return-filter" className="sr-only">
          Filtrar embarcaciones en el agua
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            ref={filterRef}
            id="return-filter"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por bote, matrícula o propietario"
            className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-9 text-sm text-slate-900 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (!loading) void load();
          }}
          aria-disabled={loading}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none aria-disabled:opacity-60"
        >
          <RefreshCw
            className={cn('size-4', loading && 'animate-spin')}
            aria-hidden="true"
          />
          Actualizar
        </button>
      </div>

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

      {actionError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionError}
        </p>
      ) : null}

      {loading && departures.length === 0 ? (
        <p className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Cargando embarcaciones en el agua…
        </p>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="flex flex-col items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
          <button
            type="button"
            onClick={() => void load()}
            className="font-medium underline focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
          >
            Reintentar
          </button>
        </div>
      ) : null}

      {!loading && !error && departures.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
          No hay embarcaciones navegando en este momento.
        </p>
      ) : null}

      {departures.length > 0 && filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
          Ninguna embarcación coincide con &quot;{filter.trim()}&quot;.
        </p>
      ) : null}

      {filtered.length > 0 ? (
        <ul
          role="list"
          aria-label="Embarcaciones en el agua"
          className="flex flex-col gap-3"
        >
          {filtered.map((d) => {
            const overdue = new Date(d.estimatedReturnDatetime) < new Date();
            const busy = returningId === d.boatDepartureId;

            return (
              <li
                key={d.boatDepartureId}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Anchor className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="text-base font-semibold wrap-break-word text-slate-900">
                        {d.boatName}
                      </h3>
                      <p className="text-sm text-slate-500">
                        <span className="sr-only">Matrícula: </span>
                        {d.registrationNumber}
                      </p>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-600">
                      <User className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">Propietario: </span>
                      {d.ownerName}
                    </p>
                    <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                      <div className="xs:flex-row flex flex-col gap-1.5 text-left">
                        <dt className="text-slate-500">Salida:</dt>
                        <dd className="text-slate-900">
                          <time dateTime={d.exitedAt}>
                            {formatDateTimeAR(d.exitedAt)}
                          </time>
                        </dd>
                      </div>
                      <div className="xs:flex-row flex flex-col gap-1.5 text-left">
                        <dt className="text-slate-500">Regreso estimado:</dt>
                        <dd
                          className={
                            overdue
                              ? 'flex items-center gap-1 font-medium text-amber-700'
                              : 'text-slate-900'
                          }
                        >
                          {overdue ? (
                            <AlertTriangle
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          ) : null}
                          <time dateTime={d.estimatedReturnDatetime}>
                            {formatDateTimeAR(d.estimatedReturnDatetime)}
                          </time>
                          {overdue ? (
                            <span className="sr-only"> (vencido)</span>
                          ) : null}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void handleReturn(d)}
                  aria-disabled={returningId !== null}
                  aria-busy={busy}
                  aria-label={`Marcar retorno de ${d.boatName}`}
                  className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:outline-none aria-disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                  ) : null}
                  Marcar retorno
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
