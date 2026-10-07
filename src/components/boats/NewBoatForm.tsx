'use client';

import { useActionState } from 'react';

import { actions } from '@/app/actions';
import type { BoatTypeOption, ClientOption, CradleOption } from '@/interfaces';
import { type CreateBoatFormState } from '@/validations/boat';

interface Props {
  clients: ClientOption[];
  boatTypes: BoatTypeOption[];
  cradles: CradleOption[];
}

const initialState: CreateBoatFormState = {};

const { createBoatAction } = actions.boat;

export function NewBoatForm({ clients, boatTypes, cradles }: Props) {
  const [state, formAction, isPending] = useActionState(
    createBoatAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="mx-auto max-w-2xl rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
    >
      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="sr-only">Datos de la embarcación</legend>

        <div className="sm:col-span-2">
          <label
            htmlFor="ownerPublicId"
            className="block text-sm font-medium text-slate-700"
          >
            Cliente
          </label>
          <select
            id="ownerPublicId"
            name="ownerPublicId"
            // defaultValue={state.data?.ownerPublicId ?? ''}
            aria-invalid={state.zodErrors?.ownerPublicId ? true : undefined}
            aria-describedby={
              state.zodErrors?.ownerPublicId ? 'ownerPublicId-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          >
            <option value="">Seleccioná un cliente</option>
            {clients.map((c) => (
              <option key={c.publicId} value={c.publicId}>
                {c.name}
              </option>
            ))}
          </select>
          {state.zodErrors?.ownerPublicId && (
            <p id="ownerPublicId-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.ownerPublicId[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            // defaultValue={state.data?.name}
            aria-invalid={state.zodErrors?.name ? true : undefined}
            aria-describedby={state.zodErrors?.name ? 'name-error' : undefined}
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-slate-700"
          >
            Modelo
          </label>
          <input
            id="model"
            name="model"
            // defaultValue={state.data?.model}
            aria-invalid={state.zodErrors?.model ? true : undefined}
            aria-describedby={
              state.zodErrors?.model ? 'model-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.model && (
            <p id="model-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.model[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-slate-700"
          >
            Matrícula
          </label>
          <input
            id="registrationNumber"
            name="registrationNumber"
            // defaultValue={state.data?.registrationNumber}
            aria-invalid={
              state.zodErrors?.registrationNumber ? true : undefined
            }
            aria-describedby={
              state.zodErrors?.registrationNumber
                ? 'registrationNumber-error'
                : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.registrationNumber && (
            <p
              id="registrationNumber-error"
              className="mt-1 text-sm text-red-600"
            >
              {state.zodErrors.registrationNumber[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="boatTypeId"
            className="block text-sm font-medium text-slate-700"
          >
            Tipo
          </label>
          <select
            id="boatTypeId"
            name="boatTypeId"
            // defaultValue={state.data?.boatTypeId ?? ''}
            aria-invalid={state.zodErrors?.boatTypeId ? true : undefined}
            aria-describedby={
              state.zodErrors?.boatTypeId ? 'boatTypeId-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          >
            <option value="">Seleccioná un tipo</option>
            {boatTypes.map((t) => (
              <option key={t.boatTypeId} value={t.boatTypeId}>
                {t.name}
              </option>
            ))}
          </select>
          {state.zodErrors?.boatTypeId && (
            <p id="boatTypeId-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.boatTypeId[0]}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            // defaultValue={state.data?.description}
            aria-invalid={state.zodErrors?.description ? true : undefined}
            aria-describedby={
              state.zodErrors?.description ? 'description-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.description[0]}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
        <legend className="mb-2 text-base font-semibold text-slate-900 sm:col-span-3">
          Contrato de guarda
        </legend>

        <div>
          <label
            htmlFor="cradleId"
            className="block text-sm font-medium text-slate-700"
          >
            Cuna
          </label>
          <select
            id="cradleId"
            name="cradleId"
            // defaultValue={state.data?.cradleId ?? ''}
            aria-invalid={state.zodErrors?.cradleId ? true : undefined}
            aria-describedby={
              state.zodErrors?.cradleId ? 'cradleId-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          >
            <option value="">Seleccioná una cuna</option>
            {cradles.map((c) => (
              <option key={c.cradleId} value={c.cradleId}>
                {c.cradleCode}
              </option>
            ))}
          </select>
          {cradles.length === 0 && (
            <p className="mt-1 text-sm text-amber-600">
              No hay cunas disponibles.
            </p>
          )}
          {state.zodErrors?.cradleId && (
            <p id="cradleId-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.cradleId[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="startDatetime"
            className="block text-sm font-medium text-slate-700"
          >
            Ingreso
          </label>
          <input
            id="startDatetime"
            name="startDatetime"
            type="date"
            // defaultValue={state.data?.startDatetime}
            aria-invalid={state.zodErrors?.startDatetime ? true : undefined}
            aria-describedby={
              state.zodErrors?.startDatetime ? 'startDatetime-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.startDatetime && (
            <p id="startDatetime-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.startDatetime[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="plannedEndDate"
            className="block text-sm font-medium text-slate-700"
          >
            Salida prevista (opcional)
          </label>
          <input
            id="plannedEndDate"
            name="plannedEndDate"
            type="date"
            // defaultValue={state.data?.plannedEndDate}
            aria-invalid={state.zodErrors?.plannedEndDate ? true : undefined}
            aria-describedby={
              state.zodErrors?.plannedEndDate
                ? 'plannedEndDate-error'
                : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.plannedEndDate && (
            <p id="plannedEndDate-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.plannedEndDate[0]}
            </p>
          )}
        </div>
      </fieldset>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 text-sm text-slate-600"
      >
        {state.message}
      </div>

      <button
        type="submit"
        disabled={isPending || cradles.length === 0}
        className="mt-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? 'Guardando...' : 'Registrar embarcación'}
      </button>
    </form>
  );
}
