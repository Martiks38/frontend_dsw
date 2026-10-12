'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId, useRef, useState } from 'react';

import { REQUEST_STATUS_LABELS } from '@/data';
import type {
  ServiceRequestSearchParams,
  ServiceTypeOption,
} from '@/interfaces';
import { cn } from '@/lib/cn';

interface Props {
  serviceTypes: ServiceTypeOption[];
  currentFilters: ServiceRequestSearchParams;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

const inputStyles = 'mt-1 w-full rounded-md border-slate-300 text-sm';
const focusRing =
  'focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none';

export function ServiceRequestFilters({ serviceTypes, currentFilters }: Props) {
  const router = useRouter();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { status, serviceTypeId, from, until } = currentFilters;
  const activeCount = [status, serviceTypeId, from, until].filter(
    Boolean
  ).length;

  const filtersKey = [status, serviceTypeId, from, until].join('|');

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      const stringValue = value.toString();

      if (stringValue) params.set(key, stringValue);
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);

    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <form
      method="get"
      onSubmit={handleSubmit}
      aria-label="Filtrar solicitudes"
      className="mt-4"
    >
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 md:hidden',
          focusRing
        )}
      >
        <span>
          Filtros
          {activeCount > 0 && (
            <span className="sr-only"> ({activeCount} activos)</span>
          )}
        </span>
        <span className="flex items-center gap-2">
          {activeCount > 0 && (
            <span
              aria-hidden="true"
              className="bg-primary rounded-full px-2 text-xs text-white"
            >
              {activeCount}
            </span>
          )}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </span>
      </button>

      <div
        id={panelId}
        className={cn('mt-3 md:mt-0', !open && 'hidden md:block')}
      >
        <div className="@container">
          <div
            key={filtersKey}
            className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @3xl:grid-cols-4"
          >
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select id="status" defaultValue={status ?? ''}>
                <option value="">Todos</option>
                {Object.entries(REQUEST_STATUS_LABELS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="serviceTypeId">Tipo</Label>
              <Select id="serviceTypeId" defaultValue={serviceTypeId ?? ''}>
                <option value="">Todos</option>
                {serviceTypes.map((st) => (
                  <option key={st.serviceTypeId} value={st.serviceTypeId}>
                    {st.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="from">Desde</Label>
              <input
                type="date"
                name="from"
                id="from"
                defaultValue={from ?? ''}
                className={inputStyles}
              />
            </div>

            <div>
              <Label htmlFor="until">Hasta</Label>
              <input
                type="date"
                name="until"
                id="until"
                defaultValue={until ?? ''}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 @sm:flex-row @sm:items-center">
            <button
              type="submit"
              className={cn(
                'bg-primary w-full rounded-md px-4 py-2 text-sm font-medium text-white @sm:w-auto',
                'hover:bg-blue-600',
                focusRing
              )}
            >
              Aplicar filtros
            </button>

            {activeCount > 0 && (
              <Link
                href="?"
                className={cn(
                  'rounded text-center text-sm font-medium text-blue-600 hover:underline',
                  focusRing
                )}
              >
                Limpiar filtros
              </Link>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-slate-700"
    >
      {children}
    </label>
  );
}

function Select({ id, defaultValue, children }: SelectProps) {
  return (
    <select
      name={id}
      id={id}
      defaultValue={defaultValue}
      className={inputStyles}
    >
      {children}
    </select>
  );
}
