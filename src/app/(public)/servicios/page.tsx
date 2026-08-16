import Banner, { type BannerButton } from '@/components/ui/Banner/Banner';
import CardGrid from '@/components/ui/CardGrid/CardGrid';
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
      className="mx-auto my-0 w-full px-16 pt-20 pb-20"
    >
      <header className="mb-24 text-center">
        <h1 id="services-title" className="mb-2 text-5xl font-bold">
          Nuestros servicios
        </h1>
        <p className="mt-8 text-3xl">Todo lo que tu embarcación necesita</p>
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
