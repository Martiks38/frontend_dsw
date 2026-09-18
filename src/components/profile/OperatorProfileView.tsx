'use client';

import { useActionState, useEffect, useRef } from 'react';

import { changePasswordAction } from '@/app/actions/profile';
import { EmployeeProfile } from '@/interfaces';
import { type ChangePasswordFormState } from '@/validations/profile';

import { PasswordField } from './PasswordField';

const styles = {
  headers: 'text-base font-semibold text-slate-900',
};
const initialPasswordState: ChangePasswordFormState = {};

export function OperatorProfileView({ profile }: { profile: EmployeeProfile }) {
  const [passwordState, passwordFormAction, isPending] = useActionState(
    changePasswordAction,
    initialPasswordState
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (passwordState.success) {
      formRef.current?.reset();
    }
  }, [passwordState.success]);

  const passwordErrors = passwordState.zodErrors
    ? [
        ...(passwordState.zodErrors.currentPassword ?? []),
        ...(passwordState.zodErrors.newPassword ?? []),
        ...(passwordState.zodErrors.confirmPassword ?? []),
      ]
    : [];

  const hasPasswordError =
    passwordErrors.length > 0 || passwordState.success === false;

  return (
    <div className="mx-auto max-w-4xl">
      <header>
        <h1 className="text-xl font-semibold text-slate-900">Mi perfil</h1>
        <p className="text-sm text-slate-500">
          Gestioná tu información personal y de acceso.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="info-personal"
          className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
        >
          <h2 id="info-personal" className={styles.headers}>
            Información personal
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-y-3 text-sm">
            <div>
              <Dt>Nombre</Dt>
              <Dd>{profile.firstName}</Dd>
            </div>
            <div>
              <Dt>Apellido</Dt>
              <Dd>{profile.lastName}</Dd>
            </div>
            <div>
              <Dt>Email</Dt>
              <Dd>{profile.email}</Dd>
            </div>
            <div>
              <Dt>Teléfono</Dt>
              <Dd>{profile.phoneNumber}</Dd>
            </div>
          </dl>

          <h2 className="mt-6 text-base font-semibold text-slate-900">
            Información laboral
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-y-3 text-sm">
            <div>
              <Dt>Rol</Dt>
              <Dd>{profile.role === 'OPERATOR' ? 'Operador' : 'Admin'}</Dd>
            </div>
            <div>
              <Dt>Fecha de ingreso</Dt>
              <Dd>{profile.joinedAtLabel}</Dd>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="cambiar-password"
          className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
        >
          <h2 id="cambiar-password" className={styles.headers}>
            Cambiar contraseña
          </h2>
          <form
            ref={formRef}
            action={passwordFormAction}
            className="mt-4 space-y-4"
          >
            <PasswordField
              label="Contraseña actual"
              name="currentPassword"
              autoComplete="current-password"
              invalid={
                (passwordState.zodErrors?.currentPassword?.length ?? 0) > 0
              }
            />
            <PasswordField
              label="Nueva contraseña"
              name="newPassword"
              autoComplete="new-password"
              minLength={8}
              defaultValue={passwordState.data?.newPassword}
              invalid={(passwordState.zodErrors?.newPassword?.length ?? 0) > 0}
            />
            <PasswordField
              label="Confirmar nueva contraseña"
              name="confirmPassword"
              autoComplete="new-password"
              minLength={8}
              defaultValue={passwordState.data?.confirmPassword}
              invalid={
                (passwordState.zodErrors?.confirmPassword?.length ?? 0) > 0
              }
            />

            <div
              id="password-form-error"
              role="status"
              aria-live="polite"
              className={`rounded-md text-sm ${
                hasPasswordError
                  ? 'bg-red-50 p-3 text-red-700'
                  : passwordState.success
                    ? 'bg-green-50 p-3 text-green-700'
                    : 'text-slate-600'
              }`}
            >
              {passwordErrors.length > 0 ? (
                passwordErrors.length === 1 ? (
                  <p>{passwordErrors[0]}</p>
                ) : (
                  <ul className="list-inside list-disc space-y-1">
                    {passwordErrors.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                )
              ) : (
                passwordState.message
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {isPending ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Dt({ children }: { children: React.ReactNode }) {
  return <dt className="font-medium text-slate-500">{children}</dt>;
}

function Dd({ children }: { children: React.ReactNode }) {
  return <dd className="text-slate-800">{children}</dd>;
}
