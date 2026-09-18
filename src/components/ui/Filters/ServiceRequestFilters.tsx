'use client';

import { useRouter } from 'next/navigation';

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

export function ServiceRequestFilters({ serviceTypes, currentFilters }: Props) {
  const router = useRouter();

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
  }

  return (
    <form
      method="get"
      onSubmit={handleSubmit}
      aria-label="Filtrar solicitudes"
      className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      <div>
        <Label htmlFor="status">Estado</Label>
        <Select id="status" defaultValue={currentFilters.status ?? ''}>
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
        <Select
          id="serviceTypeId"
          defaultValue={currentFilters.serviceTypeId ?? ''}
          className=""
        >
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
        <input type="date" name="from" id="from" className={inputStyles} />
      </div>

      <div>
        <Label htmlFor="until">Hasta</Label>
        <input type="date" name="until" id="until" className={inputStyles} />
      </div>

      <div className="col-span-2 sm:col-span-4">
        <button
          type="submit"
          className={cn(
            'bg-primary rounded-md px-4 py-2 text-sm font-medium text-white',
            'hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none'
          )}
        >
          Aplicar filtros
        </button>
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
