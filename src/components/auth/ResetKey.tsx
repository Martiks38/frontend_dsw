'use client';

import { CircleCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useId, useRef, useState } from 'react';

import { actions } from '@/app/actions';
import { cn } from '@/lib/cn';
import { type ResetPasswordFormState } from '@/validations/auth';

const { resetPasswordAction } = actions.auth;

const LOGIN_HREF = '/iniciar-sesion';
const FORGOT_HREF = '/recuperar-contrasena';
const PASSWORD_HINT =
  'Entre 8 y 50 caracteres, con al menos una letra y un número.';

const CARD_CLASS =
  'mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm';

const INITIAL_STATE: ResetPasswordFormState = {};

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  visible: boolean;
  inputRef: React.Ref<HTMLInputElement>;
  errors?: string[];
  hint?: string;
}

function PasswordField({
  id,
  name,
  label,
  visible,
  inputRef,
  errors,
  hint,
}: PasswordFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasError = Boolean(errors?.length);
  const describedBy =
    [hint ? hintId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-900">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        autoComplete="new-password"
        aria-invalid={hasError ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:outline-none',
          hasError
            ? 'border-red-500 focus-visible:ring-red-400'
            : 'border-slate-300 focus-visible:border-blue-500 focus-visible:ring-blue-400'
        )}
      />
      {hasError ? (
        <p id={errorId} className="text-sm font-medium text-red-700">
          <span className="sr-only">Error: </span>
          {errors?.[0]}
        </p>
      ) : null}
    </div>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const baseId = useId();
  const newRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (state.success) {
      successRef.current?.focus();
    } else if (state.zodErrors?.newPassword) {
      newRef.current?.focus();
    } else if (state.zodErrors?.confirmPassword) {
      confirmRef.current?.focus();
    }
  }, [state]);

  if (state.success) {
    return (
      <section aria-labelledby={`${baseId}-success`} className={CARD_CLASS}>
        <CircleCheck
          className="mb-3 size-8 text-green-600"
          aria-hidden="true"
        />
        <h1
          ref={successRef}
          id={`${baseId}-success`}
          tabIndex={-1}
          className="text-xl font-semibold text-slate-900 focus:outline-none"
        >
          Contraseña actualizada
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ya podés iniciar sesión con tu nueva contraseña.
        </p>
        <Link
          href={LOGIN_HREF}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Ir a iniciar sesión
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby={`${baseId}-heading`} className={CARD_CLASS}>
      <h1
        id={`${baseId}-heading`}
        className="text-xl font-semibold text-slate-900"
      >
        Restablecer contraseña
      </h1>
      <p className="mt-1 mb-5 text-sm text-slate-600">
        Elegí una contraseña nueva. Todos los campos son obligatorios.
      </p>

      <form action={formAction} noValidate className="flex flex-col gap-4">
        <input type="hidden" name="token" value={token} />

        <PasswordField
          id={`${baseId}-new`}
          name="newPassword"
          label="Nueva contraseña"
          visible={visible}
          inputRef={newRef}
          errors={state.zodErrors?.newPassword}
          hint={PASSWORD_HINT}
        />

        <PasswordField
          id={`${baseId}-confirm`}
          name="confirmPassword"
          label="Confirmar contraseña"
          visible={visible}
          inputRef={confirmRef}
          errors={state.zodErrors?.confirmPassword}
        />

        <label className="flex min-h-10 items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
            className="size-4 rounded border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          />
          Mostrar contraseñas
        </label>

        {state.message || state.zodErrors?.token ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.message ?? state.zodErrors?.token?.[0]}
          </p>
        ) : null}

        <button
          type="submit"
          aria-disabled={pending}
          aria-busy={pending}
          onClick={(e) => {
            if (pending) e.preventDefault();
          }}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none aria-disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {pending ? 'Guardando…' : 'Cambiar contraseña'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        ¿El enlace venció?{' '}
        <Link
          href={FORGOT_HREF}
          className="rounded font-medium text-blue-600 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          Solicitá uno nuevo
        </Link>
      </p>
    </section>
  );
}
