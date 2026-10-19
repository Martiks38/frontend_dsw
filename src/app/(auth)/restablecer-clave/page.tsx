import { type Metadata } from 'next';
import Link from 'next/link';

import { ResetPasswordForm } from '@/components/auth/ResetKey';

export const metadata: Metadata = {
  title: 'Restablecer contraseña',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;
  const value = Array.isArray(token) ? token[0] : token;

  if (!value) {
    return (
      <section
        aria-labelledby="invalid-link-heading"
        className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1
          id="invalid-link-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Enlace no válido
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          El enlace para restablecer la contraseña está incompleto o venció.
        </p>
        <Link
          href="/recuperar-contrasena"
          className="mt-4 inline-flex min-h-10 items-center rounded text-sm font-medium text-blue-600 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
        >
          Solicitar un nuevo enlace
        </Link>
      </section>
    );
  }

  return <ResetPasswordForm token={value} />;
}
