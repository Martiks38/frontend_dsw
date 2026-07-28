import Link from 'next/link';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import HomeSection from '@/components/layout/HomeSection/HomeSection';
import { benefits, footerColumns, services } from '@/data';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section>
          <h1>
            Tu embarcación.
            <br />
            Nuestro cuidado.
          </h1>
          <p>
            Guardería náutica y servicios para que disfrutes de tu embarcación
            cuando quieras.
          </p>
          <div>
            <Link href={''}>Conocé nuestros servicios</Link>
            <Link href={''}>Solicitar guardado</Link>
          </div>
        </section>
        <HomeSection title="¿Por qué elegirnos?" cardData={benefits} />
        <HomeSection title="Nuestros servicios" cardData={services}>
          <Link href={''}>Ver todos los servicios</Link>
        </HomeSection>
      </main>
      <Footer
        logoSrc="/logo_2.png"
        logoAlt="Guardería náutica"
        columns={footerColumns}
      />
    </>
  );
}
