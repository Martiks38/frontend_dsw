import Banner, { type BannerButton } from '@/components/ui/Banner/Banner';
import CardGrid from '@/components/ui/Card/CardGrid/CardGrid';
import { PAGE_SERVICES } from '@/data';

export const metadata = {
  title: 'Servicios Náuticos | Cuidado, Mantenimiento y Bajadas',
  description:
    'Descubre nuestros servicios: cama en guardería, carga de batería, lavados, mantenimiento preventivo y bajada y elevación de embarcaciones.',
};

export default function Services() {
  const configButton: BannerButton = {
    href: '/login',
    text: 'Iniciar sesión',
    variant: 'primary',
  };

  return (
    <section
      aria-labelledby="services-title"
      className="mx-auto my-0 w-full px-10 py-16 md:px-16 md:py-20"
    >
      <header className="mb-12 text-center sm:mb-20 md:mb-24">
        <h1 id="services-title" className="mb-2 text-3xl font-bold md:text-4xl">
          Nuestros servicios
        </h1>
        <p className="mt-4 text-xl md:mt-8 md:text-2xl">
          Todo lo que tu embarcación necesita
        </p>
      </header>
      <CardGrid cards={PAGE_SERVICES} />
      <Banner
        heading="¿Necesitás alguno de nuestros servicios?"
        text="Inicia sesión para realizar tu solicitud de servicio."
        button={configButton}
      />
    </section>
  );
}
