'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { resetPassword } from '@/lib/auth-recovery';

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get('token') ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirm) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    startTransition(async () => {
      try {
        await resetPassword(token, newPassword);
        setMessage('Contraseña actualizada. Redirigiendo al login...');
        setTimeout(() => router.push('/iniciar-sesion'), 2000);
      } catch (err) {
        setMessage(err instanceof Error ? err.message : 'Ocurrió un error.');
      }
    });
  }

  if (!token) {
    return (
      <p className="mx-auto mt-16 max-w-sm text-sm text-red-600">
        Link inválido.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="text-xl font-semibold text-slate-900">Nueva contraseña</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-slate-700"
          >
            Nueva contraseña
          </label>
          <input
            id="newPassword"
            type="password"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-slate-700"
          >
            Confirmar contraseña
          </label>
          <input
            id="confirm"
            type="password"
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="mt-1 w-full rounded-md border-slate-300 text-sm"
          />
        </div>
        <div
          role="status"
          aria-live="polite"
          className="text-sm text-slate-600"
        >
          {message}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : 'Cambiar contraseña'}
        </button>
      </form>
    </div>
  );
}
