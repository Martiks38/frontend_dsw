'use client';

import { Loader2, Sailboat, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { actions } from '@/app/actions';
import { type BoatSearchResult } from '@/interfaces/operations.interface';
import {
  argentinaInputToDate,
  toArgentinaInputValue,
} from '@/utils/datetime.util';

const DEFAULT_RETURN_HOURS = 4;
const { createDepartureAction } = actions.boatDeparture;

interface DepartureDialogProps {
  boat: BoatSearchResult | null;
  onClose: () => void;
  onSuccess: (boat: BoatSearchResult) => void;
}

export function DepartureDialog({
  boat,
  onClose,
  onSuccess,
}: DepartureDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputId = useId();
  const errorId = useId();

  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (boat) {
      const suggested = new Date(
        Date.now() + DEFAULT_RETURN_HOURS * 60 * 60 * 1000
      );
      setValue(toArgentinaInputValue(suggested));
      setError(null);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [boat]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!boat || submitting) return;

    if (!value) {
      setError('La fecha y hora estimada de regreso es obligatoria.');
      return;
    }

    const estimated = argentinaInputToDate(value);
    if (
      Number.isNaN(estimated.getTime()) ||
      estimated.getTime() <= Date.now()
    ) {
      setError('El regreso estimado debe ser posterior a la hora actual.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await createDepartureAction(
        boat.publicId,
        estimated.toISOString()
      );
      if (result.success) onSuccess(boat);
      else setError(result.errorMessage ?? 'No se pudo registrar la salida.');
    } catch {
      setError('No se pudo registrar la salida. Intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      aria-labelledby={`${inputId}-title`}
      className="m-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/50"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={`${inputId}-title`}
              className="text-lg font-semibold text-slate-900"
            >
              Registrar salida
            </h2>
            {boat ? (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <Sailboat className="size-4" aria-hidden="true" />
                {boat.name}
                {boat.registrationNumber ? ` · ${boat.registrationNumber}` : ''}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700"
          >
            Fecha y hora estimada de regreso{' '}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={inputId}
            type="datetime-local"
            required
            value={value}
            min={toArgentinaInputValue(new Date())}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          />
          <p className="text-xs text-slate-500">Hora de Argentina.</p>
          {error ? (
            <p id={errorId} role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            disabled={submitting}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : null}
            Confirmar salida
          </button>
        </div>
      </form>
    </dialog>
  );
}
