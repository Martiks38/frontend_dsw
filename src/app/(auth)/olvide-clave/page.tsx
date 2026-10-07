'use client';

import { useState, useTransition } from 'react';

import { forgotPassword } from '@/lib/auth-recovery';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        await forgotPassword(email);

        setMessage(
          'Si el email existe, vas a recibir un correo con instrucciones.'
        );
      } catch {
        setMessage('Ocurrió un error. Intentá de nuevo.');
      }
    });
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="text-xl font-semibold text-slate-900">
        Recuperar contraseña
      </h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-md border-slate-300 text-sm"
        />
        <div
          role="status"
          aria-live="polite"
          className="mt-3 text-sm text-slate-600"
        >
          {message}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? 'Enviando...' : 'Enviar instrucciones'}
        </button>
      </form>
    </div>
  );
}
