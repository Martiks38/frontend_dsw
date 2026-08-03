import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { HomeSection, IntroSection } from '@/components/layout/Section';
import ButtonLink from '@/components/ui/Button/Button';
import { benefits, footerColumns, services } from '@/data';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl grow flex-col justify-center justify-items-center">
      <Header />
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
        <HomeSection title="¿Por qué elegirnos?" cardData={benefits} />
        <HomeSection
          title="Nuestros servicios"
          cardData={services.filter((s) => s.showOnHome)}
        >
          <ButtonLink href={''} className="mx-auto mt-8 block w-fit">
            Ver todos los servicios
          </ButtonLink>
        </HomeSection>
        <HomeSection
          title="¿Querés guardar tu embarcación con nosotros?"
          className={styles.banner}
        >
          <p>Consultá disponibilidad y conocé nuestras condiciones.</p>
          <ButtonLink
            href={''}
            variant="secondary"
            className="text-semibold text-2xl"
          >
            Solicitar guardado
          </ButtonLink>
        </HomeSection>
      </main>
      <Footer
        logoSrc="/logo_2.png"
        logoAlt="Guardería náutica"
        columns={footerColumns}
      />
    </div>
  );
}
