import Link from 'next/link';

import { SERVICES_CATALOG } from '@/data/services-catalog.data';

export function ServicesCatalog() {
  return (
    <div>
      <header>
        <h1
          id="servicios-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Servicios
        </h1>
        <p className="text-sm text-slate-500">
          Conocé nuestros servicios y solicitá el que necesitás.
        </p>
      </header>

      <section
        aria-labelledby="servicios-heading"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES_CATALOG.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.id}
              className="relative rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:ring-blue-200"
            >
              <Icon
                aria-hidden="true"
                className="mx-auto h-8 w-8 text-blue-600"
              />
              <h2 className="mt-3 text-base font-semibold text-slate-900">
                {service.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {service.description}
              </p>
              <Link
                href={`/dashboard/servicios/solicitar?servicio=${service.id}`}
                className="relative z-10 mt-4 block rounded-md border border-blue-600 px-4 py-2 text-center text-sm font-medium text-blue-600 after:absolute after:inset-0 after:content-[''] hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              >
                Solicitar
                <span className="sr-only"> servicio de {service.name}</span>
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
