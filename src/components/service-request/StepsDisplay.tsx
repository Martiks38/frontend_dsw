import { memo } from 'react';

import { cn } from '@/lib/cn';

import { SEQUENCE, type StepKey } from './consts';

const STEP_LABELS: Record<StepKey, string> = {
  boat: 'Embarcación',
  service: 'Elegir servicios',
  confirm: 'Confirmar',
};

export const StepsDisplay = memo(function StepsDisplay({
  stepIndex,
}: {
  stepIndex: number;
}) {
  return (
    <nav aria-label="Progreso de la solicitud">
      <ol className="text-primary mx-auto mt-4 flex max-w-250 items-start justify-center p-0">
        {SEQUENCE.map((key, i) => (
          <li
            key={key}
            aria-current={i === stepIndex ? 'step' : undefined}
            className={cn(
              'relative flex flex-1 flex-col items-center px-2 text-center',
              i !== stepIndex && 'max-xs:hidden'
            )}
          >
            {i !== SEQUENCE.length - 1 && (
              <span
                aria-hidden="true"
                className="max-xs:hidden absolute top-10 left-1/2 z-0 w-full border-t-2 border-dashed border-[#99a5c3]"
              />
            )}

            <span
              className={cn(
                'max-xs:hidden relative z-1 mb-3.75 flex size-20 items-center justify-center rounded-full border-2 bg-white',
                i <= stepIndex
                  ? 'border-blue-600 text-blue-600'
                  : 'border-slate-600 text-slate-600'
              )}
            >
              <span className="text-2xl leading-none font-bold">{i + 1}</span>
            </span>

            <span
              className={cn(
                'max-xs:max-w-none max-xs:text-2xl mt-1 max-w-32.5 text-lg',
                i === stepIndex
                  ? 'font-bold text-slate-900'
                  : i < stepIndex
                    ? 'font-medium text-slate-700'
                    : 'text-slate-600'
              )}
            >
              <span className="xs:hidden sr-only">
                Paso {i + 1} de {SEQUENCE.length}:{' '}
              </span>
              {STEP_LABELS[key]}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
});
