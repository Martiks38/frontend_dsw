import Link from 'next/link';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import HomeSection from '@/components/layout/HomeSection/HomeSection';
import ButtonLink from '@/components/ui/Button/Button';
import { benefits, footerColumns, services } from '@/data';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className="flex flex-col grow mx-auto px-4 w-full max-w-7xl justify-center justify-items-center">
      <Header />
      <main>
        <section
          className={`${styles.intro} relative flex flex-col justify-end min-h-[70dvh] px-16 pb-20 bg-[url('/portada.webp')] bg-cover bg-position[0% 0%]`}
        >
          <div>
            <h1 className="text-4xl font-semibold mb-4">
              Tu embarcación.
              <br />
              Nuestro cuidado.
            </h1>
            <p className="w-[35ch] text-2xl">
              Guardería náutica y servicios para que disfrutes de tu embarcación
              cuando quieras.
            </p>
            <nav
              className="*:first:mr-6 mt-10 text-xl font-semibold"
              aria-label="Servicios y solicitudes"
            >
              <ButtonLink href={''}>Conocé nuestros servicios</ButtonLink>
              <ButtonLink href="" variant="secondary">
                Solicitar guardado
              </ButtonLink>
            </nav>
          </div>
        </section>
        <HomeSection title="¿Por qué elegirnos?" cardData={benefits} />
        <HomeSection
          title="Nuestros servicios"
          cardData={services.filter((s) => s.showOnHome)}
        >
          <Link href={''}>Ver todos los servicios</Link>
        </HomeSection>
        <HomeSection title="¿Querés guardar tu embarcación con nosotros?">
          <p>Consultá disponibilidad y conocé nuestras condiciones.</p>
          <Link href={''}>Solicitar guardado</Link>
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
