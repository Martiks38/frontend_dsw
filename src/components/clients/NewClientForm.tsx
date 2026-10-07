// components/clients/NewClientForm.tsx
'use client';

import { useActionState, useState } from 'react';

import { actions } from '@/app/actions';
import { type CreateClientFormState } from '@/validations/client';

const initialState: CreateClientFormState = {};
const { createClientAction } = actions.client;

export function NewClientForm() {
  const [state, formAction, isPending] = useActionState(
    createClientAction,
    initialState
  );
  const [type, setType] = useState<'individual' | 'business'>(
    (state.data?.type as 'individual' | 'business') ?? 'individual'
  );

  return (
    <form
      action={formAction}
      className="mx-auto max-w-xl rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
    >
      <fieldset>
        <legend className="text-base font-semibold text-slate-900">
          Tipo de cliente
        </legend>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="type"
              value="individual"
              checked={type === 'individual'}
              onChange={() => setType('individual')}
            />
            Persona física
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="type"
              value="business"
              checked={type === 'business'}
              onChange={() => setType('business')}
            />
            Empresa
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="sr-only">Datos del cliente</legend>

        {type === 'business' ? (
          <div className="sm:col-span-2">
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-slate-700"
            >
              Razón social
            </label>
            <input
              id="businessName"
              name="businessName"
              // defaultValue={state.data?.businessName}
              aria-invalid={state.zodErrors?.businessName ? true : undefined}
              aria-describedby={
                state.zodErrors?.businessName ? 'businessName-error' : undefined
              }
              className="mt-1 w-full rounded-md border-slate-300 text-sm"
            />
            {state.zodErrors?.businessName && (
              <p id="businessName-error" className="mt-1 text-sm text-red-600">
                {state.zodErrors.businessName[0]}
              </p>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}

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
            htmlFor="documentType"
            className="block text-sm font-medium text-slate-700"
          >
            Tipo de documento
          </label>
          <select
            id="documentType"
            name="documentType"
            // defaultValue={
            //   state.data?.documentType ?? (type === 'business' ? 'CUIT' : 'DNI')
            // }
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          >
            <option value="DNI">DNI</option>
            <option value="CUIT">CUIT</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="documentNumber"
            className="block text-sm font-medium text-slate-700"
          >
            Número
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
        {isPending ? 'Creando...' : 'Crear cliente'}
      </button>
    </form>
  );
}
