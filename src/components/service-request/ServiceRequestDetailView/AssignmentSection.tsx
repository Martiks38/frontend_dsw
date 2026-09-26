'use client';

import { useState } from 'react';
import z from 'zod';

import type { OperatorOption, RequestStatus } from '@/interfaces';

const assignmentSchema = z
  .object({
    employeePublicId: z.string().min(1, 'Seleccioná un operario.'),
    scheduledDate: z.string().min(1, 'Seleccioná una fecha.'),
    scheduledTime: z.string().min(1, 'Seleccioná una hora.'),
    sector: z.string(),
  })
  .refine(
    ({ scheduledDate, scheduledTime }) => {
      if (!scheduledDate || !scheduledTime) return true;
      return new Date(`${scheduledDate}T${scheduledTime}`) >= new Date();
    },
    { path: ['scheduledTime'], message: 'La fecha y hora deben ser futuras.' }
  );

export type AssignmentInput = z.infer<typeof assignmentSchema>;

interface Props {
  status: RequestStatus;
  operators: OperatorOption[];
  disabled: boolean;
  onSubmit: (input: AssignmentInput) => void;
  onValidationError: (message: string) => void;
}

const todayISO = new Date().toISOString().split('T')[0];

export function AssignmentSection({
  status,
  operators,
  disabled,
  onSubmit,
  onValidationError,
}: Props) {
  const [employeePublicId, setEmployeePublicId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [sector, setSector] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = assignmentSchema.safeParse({
      employeePublicId,
      scheduledDate,
      scheduledTime,
      sector,
    });

    if (!result.success) {
      onValidationError(result.error.issues[0].message);
      return;
    }
    onSubmit(result.data);
  }

  return (
    <section
      aria-labelledby="asignar-heading"
      className="mt-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
    >
      <h2
        id="asignar-heading"
        className="text-base font-semibold text-slate-900"
      >
        {status === 'PENDING' ? 'Asignar operario' : 'Reprogramar'}
      </h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <legend className="sr-only">Datos de asignación</legend>

          <div className="sm:col-span-2">
            <label
              htmlFor="employee"
              className="block text-sm font-medium text-slate-700"
            >
              Operario
            </label>
            <select
              id="employee"
              value={employeePublicId}
              onChange={(e) => setEmployeePublicId(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-slate-300 text-sm"
            >
              <option value="">Seleccioná un operario</option>
              {operators.map((op) => (
                <option key={op.publicId} value={op.publicId}>
                  {op.firstName} {op.lastName} · {op.totalThisMonth} trabajos
                  este mes
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="scheduledDate"
              className="block text-sm font-medium text-slate-700"
            >
              Fecha
            </label>
            <input
              id="scheduledDate"
              type="date"
              min={todayISO}
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-slate-300 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="scheduledTime"
              className="block text-sm font-medium text-slate-700"
            >
              Hora
            </label>
            <input
              id="scheduledTime"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-slate-300 text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="sector"
              className="block text-sm font-medium text-slate-700"
            >
              Sector (opcional)
            </label>
            <input
              id="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="mt-1 w-full rounded-md border-slate-300 text-sm"
            />
          </div>
        </fieldset>

        <div className="mt-4">
          <button
            type="submit"
            disabled={disabled}
            className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {status === 'PENDING' ? 'Asignar' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </section>
  );
}
