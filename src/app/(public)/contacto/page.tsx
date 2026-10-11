import { Clock } from 'lucide-react';

import { IntroSection, PageSection } from '@/components/layout/Section';
import { ContactForm } from '@/components/ui/ContactForm/ContactForm';
import { ContactInfoPanel } from '@/components/ui/ContactInfoPanel/ContactInfoPanel';
import { CONTACT_ITEMS, SCHEDULE_ITEMS, SCHEDULE_NOTE } from '@/data';

export const metadata = {
  title: 'Contacto | Guardería Náutica',
  description: 'Ponte en contacto con nosotros para realizar tus consultas.',
};

export default function ContactPage() {
  return (
    <>
      <IntroSection
        title={
          <>
            ¿Tenés alguna
            <br />
            consulta?
          </>
        }
        heroImageUrl="/images/heroImages/hero_image_contact.webp"
        className="text-center sm:text-left"
      >
        <p className="mx-auto w-full max-w-[35ch] text-xl sm:mx-0">
          Estamos para ayudarte. Comunicate con nosotros o acercate a nuestas
          instalaciones.
        </p>
      </IntroSection>
      <PageSection heading="Contacto" className="pb-12 [&>h2]:sr-only">
        <div className="custom-md:grid-cols-[1fr_23.75rem] custom-md:gap-8 grid grid-cols-1 gap-10">
          <ContactForm className="place-self-center" />
          <aside
            className="flex h-fit flex-col rounded-xl bg-[#d7e1eb54] p-6 shadow-md"
            aria-labelledby="contact-info-heading"
          >
            <h2
              id="contact-info-heading"
              className="mb-10 text-center text-xl font-semibold"
            >
              Información de contacto
            </h2>

            <ContactInfoPanel items={CONTACT_ITEMS} />

            <div className="mt-7 flex items-start gap-6">
              <div className="xs:block hidden">
                <Clock className="mt-0.5 h-8 w-8 shrink-0" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                  Horarios de atención
                </h3>
                <dl className="space-y-4">
                  {SCHEDULE_ITEMS.map(({ label, value }) => {
                    return (
                      <div key={label} className="leading-8">
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-2">{SCHEDULE_NOTE}</p>
              </div>
            </div>
          </aside>
        </div>
      </PageSection>
    </>
  );
}
