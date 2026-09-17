import Link from 'next/link';

import { SERVICES_CATALOG } from '@/data';
import { cn } from '@/lib/cn';

export const metadata = { title: 'Servicios | Guardería Náutica' };

export default async function ServicesPage() {
  return (
    <section
      aria-labelledby="services-heading"
      className={cn(
        'mt-6 grid grid-cols-[repeat(1,30ch)] place-content-center gap-4',
        'sm:grid-cols-[repeat(2,30ch)] md:gap-8 lg:grid-cols-[repeat(3,30ch)]'
      )}
    >
      {SERVICES_CATALOG.map((service) => {
        const Icon = service.icon;

        return (
          <article
            key={service.id}
            className="flex min-h-62.5 max-w-[30ch] flex-col rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <Icon
              aria-hidden="true"
              className="mx-auto h-8 w-8 text-blue-600"
            />
            <h2 className="mt-6 text-center text-base font-semibold text-slate-900">
              {service.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{service.description}</p>
            <Link
              href={`/dashboard/servicios/solicitar?servicio=${service.id}`}
              className={cn(
                'mt-auto block rounded-md border border-blue-700 px-4 py-2 text-center text-sm font-medium text-blue-700',
                'hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none'
              )}
            >
              Solicitar
              <span className="sr-only"> servicio de {service.name}</span>
            </Link>
          </article>
        );
      })}
    </section>
  );
}
