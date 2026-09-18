import Image from 'next/image';

import { IntroSection, PageSection } from '@/components/layout/Section';
import Icon from '@/components/ui/Icon/Icon';
import { COMPANY_VALUES } from '@/data';

import styles from './about_us.module.css';

const gallery: { src: string; alt: string }[] = [
  {
    src: '/images/facilities/facilities-warehouse-2.webp',
    alt: 'Vista interior del galpón de almacenamiento seco con embarcaciones en estanterías de varios niveles.',
  },
  {
    src: '/images/facilities/facilities-docks-2.webp',
    alt: 'Amarras flotantes en la marina exterior con embarcaciones amarradas sobre el agua.',
  },
  {
    src: '/images/facilities/facilities-docks-3.webp',
    alt: 'Lancha amarrada en el muelle principal de madera de la guardería náutica.',
  },
];

export const metadata = {
  title: 'Sobre Nosotros | Experiencia y Pasión Náutica',
  description:
    'Más de 10 años brindando la máxima seguridad, comodidad y confianza a los navegantes de la región.',
};

export default function AboutUs() {
  return (
    <>
      <IntroSection
        title="Sobre nosotros"
        heroImageUrl="/images/heroImages/hero-image-about-us.webp"
        variant="shadowless"
      >
        <p className="w-[35ch] text-2xl">
          Somos una guardería náutica dedicada al cuidado y almacenamiento de
          embarcaciones, ofreciendo a nuestros clientes un servicio seguro,
          confiable y personalizado.
        </p>
      </IntroSection>
      <PageSection heading="Nuestra misión" className={styles.section_mission}>
        <p>
          Brindar soluciones integrales para el cuidado de embarcaciones,
          garantizando seguridad, calidad y atención personalizada.
        </p>
        <Icon id="wind-rose-compass" title="Nuesta misión" size={48} />
      </PageSection>
      <PageSection heading="Nuestros valores">
        <ul
          className={`${styles.gallery} grid list-none grid-cols-2 place-items-center gap-[2rem_1rem]`}
          role="list"
        >
          {COMPANY_VALUES.map(({ id, label }) => {
            return (
              <li
                key={id}
                className="flex max-w-24 flex-col items-center text-center"
              >
                <Icon id={id} title={label} size={60} />
                <span className="pt-6 text-xl font-bold">{label}</span>
              </li>
            );
          })}
        </ul>
      </PageSection>
      <PageSection heading="Nuestras instalaciones">
        <figure className="pb-12">
          <div className={`${styles.facilities} grid grid-cols-[1fr] gap-6`}>
            {gallery.map(({ src, alt }) => {
              return (
                <div
                  key={alt}
                  className={
                    'relative min-h-64 w-full overflow-hidden rounded-3xl'
                  }
                >
                  <Image src={src} alt={alt} fill className="object-cover" />
                </div>
              );
            })}
          </div>
          <figcaption className="sr-only">
            Nuestras instalaciones incluyen almacenamiento cubierto en galpón y
            amarras en marina exterior.
          </figcaption>
        </figure>
      </PageSection>
    </>
  );
}
