import Image from 'next/image';

import { HomeSection, IntroSection } from '@/components/layout/Section';
import Banner from '@/components/ui/Banner/Banner';
import CheckList from '@/components/ui/Lists/CheckList/CheckList';
import StepsList from '@/components/ui/Lists/StepsList/StepsList';
import { CONTRACT_PROCESS, GALLERY_IMAGES, SERVICE_SCOPE } from '@/data';

export default function Marina() {
  return (
    <>
      <IntroSection
        heroImageUrl="/hero-image-boat-storage.webp"
        title={
          <>
            Guardamos tu embarcación,
            <br />
            cuidamos tu tranquilidad
          </>
        }
      >
        <p className="w-[35ch] text-xl">
          Contamos con instalaciones diseñadas para el guardado seguro de
          embarcaiones, con atención personalizada y servicios de primer nivel.
        </p>
      </IntroSection>
      <HomeSection heading="¿Cómo funciona?" className="[&>h2]:text-left">
        <StepsList steps={CONTRACT_PROCESS} />
      </HomeSection>
      <hr className="mx-16 mt-12 text-(--primary-color-60)" />
      <HomeSection
        heading="¿Qué incluye el sericio?"
        className="[&>h2]:text-left"
      >
        <CheckList items={SERVICE_SCOPE} />
      </HomeSection>
      <HomeSection
        heading="Nuestras instalaciones"
        className="[&>h2]:text-left"
      >
        <ul className="mt-8 flex gap-x-6">
          {GALLERY_IMAGES.map(({ id, src, alt }) => {
            return (
              <li key={id}>
                <figure className="overflow-clip rounded-2xl">
                  <Image
                    src={src}
                    alt={alt}
                    loading="lazy"
                    width="300"
                    height="300"
                  />
                </figure>
              </li>
            );
          })}
        </ul>
      </HomeSection>
      <div className="mb-12 px-16">
        <Banner
          className="rounded-[10px]"
          heading="Solicitá disponibilidad para tu embarcación"
          text="Completá el formulario y nos comunicaremos con vos."
          button={{
            href: '',
            text: 'Solicitar guardado',
            variant: 'primary',
          }}
        />
      </div>
    </>
  );
}
