import { Compass } from 'lucide-react';
import Image from 'next/image';

import { IntroSection, PageSection } from '@/components/layout/Section';
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
        className="text-center md:text-left"
      >
        <p className="max-w-[35ch] text-center text-xl sm:text-2xl md:text-left">
          Somos una guardería náutica dedicada al cuidado y almacenamiento de
          embarcaciones, ofreciendo a nuestros clientes un servicio seguro,
          confiable y personalizado.
        </p>
      </IntroSection>
      <PageSection heading="Nuestra misión" className={styles.section_mission}>
        <p className="text-center sm:text-left">
          Brindar soluciones integrales para el cuidado de embarcaciones,
          garantizando seguridad, calidad y atención personalizada.
        </p>
        <Compass aria-hidden="true" />
      </PageSection>
      <PageSection heading="Nuestros valores">
        <ul
          className="flex shrink-0 list-none flex-wrap justify-around gap-[2rem_1rem]"
          role="list"
        >
          {COMPANY_VALUES.map(({ icon: Icon, label }) => {
            return (
              <li
                key={label}
                className="flex w-38 flex-col items-center text-center"
              >
                <Icon size={60} />
                <span className="pt-6 text-xl font-bold">{label}</span>
              </li>
            );
          })}
        </ul>
      </PageSection>
      <PageSection heading="Nuestras instalaciones">
        <figure className="pb-12">
          <div className={styles.facilities}>
            {gallery.map(({ src, alt }) => {
              return (
                <div
                  key={alt}
                  className="relative min-h-64 w-full overflow-hidden rounded-3xl"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-center"
                  />
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
