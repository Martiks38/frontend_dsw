import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { HomeSection, IntroSection } from '@/components/layout/Section';
import Banner from '@/components/ui/Banner/Banner';
import ButtonLink from '@/components/ui/Button/Button';
import CardList from '@/components/ui/Lists/CardList/CardList';
import { benefits, footerColumns, services } from '@/data';

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl grow flex-col justify-center justify-items-center">
      <Header srcLogo="/logo_2.png" altLogo="Guardería náutica" />
      <main id="main-content" className="mt-(--height-header)" tabIndex={-1}>
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
          <CardList cards={benefits} />
        </HomeSection>
        <HomeSection heading="Nuestros servicios">
          <CardList cards={services.filter((s) => s.showOnHome)} />
          <ButtonLink href={''} className="mx-auto mt-8 block w-fit">
            Ver todos los servicios
          </ButtonLink>
        </HomeSection>
        <Banner
          heading="¿Querés guardar tu embarcación con nosotros?"
          text="Consultá disponibilidad y conocé nuestras condiciones."
          button={{
            href: '',
            text: 'Solicitar guardado',
            variant: 'secondary',
          }}
        />
      </main>
      <Footer
        logoSrc="/logo_2.png"
        logoAlt="Guardería náutica"
        columns={footerColumns}
      />
    </div>
  );
}
