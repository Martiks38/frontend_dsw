import { IntroSection, PageSection } from '@/components/layout/Section';
import ContactForm from '@/components/ui/ContactForm/ContactForm';
import ContactInfoPanel from '@/components/ui/ContactInfoPanel/ContactInfoPanel';
import Icon from '@/components/ui/Icon/Icon';
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
        variant="shadowless"
      >
        <p className="w-[35ch] text-2xl">
          Estamos para ayudarte. Comunicate con nosotros o acercate a nuestas
          instalaciones.
        </p>
      </IntroSection>
      <PageSection heading="Contacto" className="pb-12 [&>h2]:sr-only">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_23.75rem]">
          <div className="">
            <ContactForm />
          </div>
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
              <Icon
                id="clock"
                title="Horarios de atención"
                size={32}
                className="mt-0.5 shrink-0"
              />
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
