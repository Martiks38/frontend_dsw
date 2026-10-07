'use client';

import { useActionState } from 'react';

import { actions } from '@/app/actions';
import { type CreateEmployeeFormState } from '@/validations/employee';

const initialState: CreateEmployeeFormState = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    documentNumber: '',
    employeeNumber: '',
  },
};
const { createEmployeeAction } = actions.employee;

export function NewEmployeeForm() {
  const [state, formAction, isPending] = useActionState(
    createEmployeeAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="mx-auto max-w-xl rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
    >
      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="sr-only">Datos del empleado</legend>

        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-700"
          >
            Nombre
          </label>
          <input
            id="firstName"
            name="firstName"
            // defaultValue={state.data?.firstName}
            aria-invalid={state.zodErrors?.firstName ? true : undefined}
            aria-describedby={
              state.zodErrors?.firstName ? 'firstName-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.firstName[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-slate-700"
          >
            Apellido
          </label>
          <input
            id="lastName"
            name="lastName"
            // defaultValue={state.data?.lastName}
            aria-invalid={state.zodErrors?.lastName ? true : undefined}
            aria-describedby={
              state.zodErrors?.lastName ? 'lastName-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.lastName && (
            <p id="lastName-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.lastName[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            // defaultValue={state.data?.email}
            aria-invalid={state.zodErrors?.email ? true : undefined}
            aria-describedby={
              state.zodErrors?.email ? 'email-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-slate-700"
          >
            Teléfono
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            // defaultValue={state.data?.phoneNumber}
            aria-invalid={state.zodErrors?.phoneNumber ? true : undefined}
            aria-describedby={
              state.zodErrors?.phoneNumber ? 'phoneNumber-error' : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.phoneNumber && (
            <p id="phoneNumber-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.phoneNumber[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="documentNumber"
            className="block text-sm font-medium text-slate-700"
          >
            DNI
          </label>
          <input
            id="documentNumber"
            name="documentNumber"
            // defaultValue={state.data?.documentNumber}
            aria-invalid={state.zodErrors?.documentNumber ? true : undefined}
            aria-describedby={
              state.zodErrors?.documentNumber
                ? 'documentNumber-error'
                : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.documentNumber && (
            <p id="documentNumber-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.documentNumber[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="employeeNumber"
            className="block text-sm font-medium text-slate-700"
          >
            Legajo
          </label>
          <input
            id="employeeNumber"
            name="employeeNumber"
            // defaultValue={state.data?.employeeNumber}
            aria-invalid={state.zodErrors?.employeeNumber ? true : undefined}
            aria-describedby={
              state.zodErrors?.employeeNumber
                ? 'employeeNumber-error'
                : undefined
            }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
          {state.zodErrors?.employeeNumber && (
            <p id="employeeNumber-error" className="mt-1 text-sm text-red-600">
              {state.zodErrors.employeeNumber[0]}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700">
              Rol
            </legend>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="employeeType"
                  value="OPERATOR"
                  defaultChecked={state.data?.employeeType !== 'ADMIN'}
                />
                Operador
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="employeeType"
                  value="ADMIN"
                  defaultChecked={state.data?.employeeType === 'ADMIN'}
                />
                Admin
              </label>
            </div>
          </fieldset>
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
        disabled={isPending}
        className="mt-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? 'Creando...' : 'Crear empleado'}
      </button>
    </form>
  );
}
