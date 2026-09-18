'use client';

import { useActionState, useEffect, useRef } from 'react';

import {
  changePasswordAction,
  updateProfileAction,
} from '@/app/actions/profile';
import type { BusinessProfile, IndividualProfile } from '@/interfaces';
import { cn } from '@/lib/cn';
import type {
  ChangePasswordFormState,
  ProfileFormState,
} from '@/validations/profile';

import { PasswordField } from './PasswordField';

interface Props {
  profile: BusinessProfile | IndividualProfile;
}

const styles = {
  profileInput: 'mt-1 w-[40ch] rounded-md border border-slate-300 text-sm p-3',
  form: 'rounded-lg border border-slate-300 bg-white p-6 shadow-sm ring-1 ring-slate-100',
};

const initialProfileState: ProfileFormState = {};
const initialPasswordState: ChangePasswordFormState = {};

export function EditableProfileForm({ profile }: Props) {
  const isBusiness = profile.type === 'business';

  const [profileState, profileFormAction, isProfilePending] = useActionState(
    updateProfileAction,
    initialProfileState
  );
  const [passwordState, passwordFormAction, isPasswordPending] = useActionState(
    changePasswordAction,
    initialPasswordState
  );

  const passwordFormRef = useRef<HTMLFormElement>(null);

  const passwordErrors = passwordState.zodErrors
    ? [
        ...(passwordState.zodErrors.currentPassword ?? []),
        ...(passwordState.zodErrors.newPassword ?? []),
        ...(passwordState.zodErrors.confirmPassword ?? []),
      ]
    : [];

  const hasPasswordError =
    passwordErrors.length > 0 || passwordState.success === false;

  useEffect(() => {
    if (passwordState.success) {
      passwordFormRef.current?.reset();
    }
  }, [passwordState.success]);

  return (
    <div className="flex flex-col gap-8 px-4">
      <form action={profileFormAction} className={styles.form}>
        <input type="hidden" name="type" value={profile.type} />
        <fieldset>
          <legend className="text-base font-semibold text-slate-900">
            Datos personales
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {isBusiness ? (
              <div className="sm:col-span-2">
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Razón social
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  defaultValue={
                    profileState.data?.businessName ?? profile.businessName
                  }
                  aria-invalid={
                    profileState.zodErrors?.businessName ? true : undefined
                  }
                  aria-describedby={
                    profileState.zodErrors?.businessName
                      ? 'businessName-error'
                      : undefined
                  }
                  className={cn(
                    styles.profileInput,
                    profileState.zodErrors?.businessName && 'border-red-500'
                  )}
                />
                {profileState.zodErrors?.businessName && (
                  <p
                    id="businessName-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {profileState.zodErrors.businessName[0]}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <label htmlFor="firstName">Nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    defaultValue={
                      profileState.data?.firstName ?? profile.firstName
                    }
                    aria-invalid={
                      profileState.zodErrors?.firstName ? true : undefined
                    }
                    aria-describedby={
                      profileState.zodErrors?.firstName
                        ? 'firstName-error'
                        : undefined
                    }
                    className={styles.profileInput}
                  />
                  {profileState.zodErrors?.firstName && (
                    <p
                      id="firstName-error"
                      className="mt-1 text-sm text-red-600"
                    >
                      {profileState.zodErrors.firstName[0]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName">Apellido</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    defaultValue={
                      profileState.data?.lastName ?? profile.lastName
                    }
                    aria-invalid={
                      profileState.zodErrors?.lastName ? true : undefined
                    }
                    aria-describedby={
                      profileState.zodErrors?.lastName
                        ? 'lastName-error'
                        : undefined
                    }
                    className={styles.profileInput}
                  />
                  {profileState.zodErrors?.firstName && (
                    <p
                      id="firstName-error"
                      className="mt-1 text-sm text-red-600"
                    >
                      {profileState.zodErrors.firstName[0]}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-col">
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
                defaultValue={profileState.data?.email ?? profile.email}
                aria-invalid={profileState.zodErrors?.email ? true : undefined}
                aria-describedby={
                  profileState.zodErrors?.email ? 'email-error' : undefined
                }
                className={cn(
                  styles.profileInput,
                  profileState.zodErrors?.email && 'border-red-500'
                )}
              />
              {profileState.zodErrors?.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {profileState.zodErrors.email[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-slate-700"
              >
                Teléfono
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={
                  profileState.data?.phoneNumber ?? profile.phoneNumber
                }
                aria-invalid={
                  profileState.zodErrors?.phoneNumber ? true : undefined
                }
                aria-describedby={
                  profileState.zodErrors?.phoneNumber
                    ? 'phoneNumber-error'
                    : undefined
                }
                className={styles.profileInput}
              />
              {profileState.zodErrors?.phoneNumber && (
                <p id="phoneNumber-error" className="mt-1 text-sm text-red-600">
                  {profileState.zodErrors.phoneNumber[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="documentNumber"
                className="block text-sm font-medium text-slate-700"
              >
                {isBusiness ? 'CUIT' : 'Documento'}
              </label>
              <input
                id="documentNumber"
                name="documentNumber"
                defaultValue={
                  profileState.data?.documentNumber ?? profile.documentNumber
                }
                aria-invalid={
                  profileState.zodErrors?.documentNumber ? true : undefined
                }
                aria-describedby={
                  profileState.zodErrors?.documentNumber
                    ? 'documentNumber-error'
                    : undefined
                }
                className={cn(
                  styles.profileInput,
                  profileState.zodErrors?.documentNumber && 'border-red-500'
                )}
              />
              {profileState.zodErrors?.documentNumber && (
                <p
                  id="documentNumber-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {profileState.zodErrors.documentNumber[0]}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <div
          role="status"
          aria-live="polite"
          className="mt-3 text-sm text-slate-600"
        >
          {profileState.message}
        </div>

        <button
          type="submit"
          disabled={isProfilePending}
          className="mt-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isProfilePending ? 'Guardando...' : 'Guardar cambios'}
        </button>
        {[1, 1].map((_, ind) => {
          console.log(profileState);

          return <div key={ind}></div>;
        })}
      </form>

      <form
        ref={passwordFormRef}
        action={passwordFormAction}
        className={styles.form}
      >
        <fieldset>
          <legend className="text-base font-semibold text-slate-900">
            Seguridad
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          </div>
        </fieldset>

        <div
          id="password-form-error"
          role="status"
          aria-live="polite"
          className={cn('mt-3 w-fit rounded-md text-sm', {
            'bg-red-50 p-3 text-red-900': hasPasswordError,
            'bg-green-50 p-3 text-green-900':
              !hasPasswordError && passwordState.success,
            'text-slate-600': !hasPasswordError && passwordState.success,
          })}
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
          disabled={isPasswordPending}
          className="mt-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPasswordPending ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}
