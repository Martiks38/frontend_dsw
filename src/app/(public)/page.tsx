import { HomeSection, IntroSection } from '@/components/layout/Section';
import Banner, { type BannerButton } from '@/components/ui/Banner/Banner';
import ButtonLink from '@/components/ui/Button/Button';
import CardList from '@/components/ui/Lists/CardList/CardList';
import { BENEFITS, HOME_SERVICES } from '@/data';

export default function Home() {
  const configButton: BannerButton = {
    href: '',
    text: 'Solicitar guardado',
    variant: 'secondary',
  };

  return (
    <>
      <IntroSection
        heroImageUrl="/portada.webp"
        title={
          <>
            Tu embarcación.
            <br />
            Nuestro cuidado.
          </>
        }
      >
        <p className="w-[35ch] text-2xl">
          Guardería náutica y servicios para que disfrutes de tu embarcación
          cuando quieras.
        </p>
        <nav
          className="mt-10 text-xl font-semibold *:first:mr-6"
          aria-label="Servicios y solicitudes"
        >
          <ButtonLink href={''}>Conocé nuestros servicios</ButtonLink>
          <ButtonLink href="" variant="secondary">
            Solicitar guardado
          </ButtonLink>
        </nav>
      </IntroSection>
      <HomeSection heading="¿Por qué elegirnos?">
        <CardList cards={BENEFITS} />
      </HomeSection>
      <HomeSection heading="Nuestros servicios">
        <CardList cards={HOME_SERVICES.filter((s) => s.showOnHome)} />
        <ButtonLink href={''} className="mx-auto mt-8 block w-fit">
          Ver todos los servicios
        </ButtonLink>
      </HomeSection>
      <Banner
        heading="¿Querés guardar tu embarcación con nosotros?"
        text="Consultá disponibilidad y conocé nuestras condiciones."
        button={configButton}
        rounded={0}
      />
    </>
  );
}
