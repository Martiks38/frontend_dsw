'use client';

import { useState } from 'react';

import type { RequestStatus } from '@/interfaces';

const NEXT_STATUS: Partial<
  Record<RequestStatus, { value: 'IN_PROGRESS' | 'COMPLETED'; label: string }>
> = {
  SCHEDULED: { value: 'IN_PROGRESS', label: 'Marcar en proceso' },
  IN_PROGRESS: { value: 'COMPLETED', label: 'Marcar completada' },
};

interface Props {
  status: RequestStatus;
  isDepartureService: boolean;
  disabled: boolean;
  onUpdate: (
    status: 'IN_PROGRESS' | 'COMPLETED',
    estimatedReturnDatetime?: string
  ) => void;
}

export function StatusActionButton({
  status,
  isDepartureService,
  disabled,
  onUpdate,
}: Props) {
  const nextStatus = NEXT_STATUS[status];
  const needsReturnTime =
    isDepartureService && nextStatus?.value === 'IN_PROGRESS';
  const [returnTime, setReturnTime] = useState('');

  if (!nextStatus) return null;

  return (
    <div className="mt-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100">
      {needsReturnTime && (
        <div className="mb-3">
          <label
            htmlFor="estimatedReturn"
            className="block text-sm font-medium text-slate-700"
          >
            Regreso estimado
          </label>
          <input
            id="estimatedReturn"
            type="datetime-local"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            required
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
        </div>
      )}
      <button
        type="button"
        disabled={disabled || (needsReturnTime && !returnTime)}
        onClick={() =>
          onUpdate(nextStatus.value, needsReturnTime ? returnTime : undefined)
        }
        className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {nextStatus.label}
      </button>
    </div>
  );
}
