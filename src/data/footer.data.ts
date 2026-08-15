import type { FooterColumn, FooterItem } from '@/interfaces';

import { CONTACT_ITEMS } from './contact.data';
import { NAVIGATION_ITEMS } from './navigation.data';
import { SCHEDULE_ITEMS, SCHEDULE_NOTE } from './schedule.data';
import { HOME_SERVICES } from './services.data';

const navItems: FooterItem[] = NAVIGATION_ITEMS.map(({ label, href }) => ({
  kind: 'link',
  label,
  href,
}));

const contactItems: FooterItem[] = CONTACT_ITEMS.map(({ label, action }) => ({
  kind: 'text',
  label,
  action,
}));

const scheduleItems: FooterItem[] = [
  ...SCHEDULE_ITEMS.map(({ label, value }) => ({
    kind: 'schedule' as const,
    label,
    value,
  })),
  { kind: 'text', label: SCHEDULE_NOTE },
];

const serviceItems: FooterItem[] = HOME_SERVICES.map(({ label }) => ({
  kind: 'text',
  label,
}));

export const FOOTER_COLUMNS: Array<FooterColumn> = [
  {
    title: 'Navegación',
    variant: 'nav',
    items: navItems,
  },
  {
    title: 'Servicios',
    items: serviceItems,
  },
  {
    title: 'Contacto',
    variant: 'address',
    items: contactItems,
  },
  {
    title: 'Horarios',
    items: scheduleItems,
  },
];
