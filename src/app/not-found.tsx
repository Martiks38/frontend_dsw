import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada | Guardería Náutica',
};

export default function NotFound() {
  return (
    <main className="bg-primary flex min-h-dvh items-center justify-center px-4 py-12 sm:px-8">
      <div className="w-full max-w-lg text-center">
        <p
          aria-hidden="true"
          className="text-8xl leading-none font-bold tracking-tight text-slate-100 sm:text-9xl"
        >
          404
        </p>

        <h1 className="mt-6 text-2xl font-semibold text-slate-200 sm:text-3xl">
          <span className="sr-only">Error 404: </span>
          No encontramos esta página
        </h1>

        <p className="mt-3 text-base text-slate-300">
          La dirección ingresada no existe. Revisá que esté bien escrita o volvé
          al inicio.
        </p>

        <Link
          href="/"
          className="text-primary mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-slate-50 px-6 py-3 text-base font-medium transition-colors hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
