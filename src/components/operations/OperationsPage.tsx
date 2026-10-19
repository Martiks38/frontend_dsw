'use client';

import { useId, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

import { DepartureTab } from './DepartureTab';
import { ReturnTab } from './ReturnTab';

const TABS = [
  { id: 'salida', label: 'Registrar salida' },
  { id: 'retorno', label: 'Registrar retorno' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function OperationsPage() {
  const [active, setActive] = useState<TabId>('salida');
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % TABS.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + TABS.length) % TABS.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = TABS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    setActive(TABS[next].id);

    tabRefs.current[next]?.focus();
  }

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4">
      <h2 id={headingId} className="sr-only">
        Operaciones
      </h2>

      <div
        role="tablist"
        aria-label="Tipo de operación"
        className="flex flex-col gap-2 rounded-xl bg-slate-100 p-1 sm:flex-row"
      >
        {TABS.map((tab, index) => {
          const selected = tab.id === active;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'min-h-10 flex-1 rounded-lg px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none',
                selected
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {tab.id === 'salida' ? <DepartureTab /> : <ReturnTab />}
        </div>
      ))}
    </section>
  );
}
