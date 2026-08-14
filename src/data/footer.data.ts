import type { FooterColumn } from '@/interfaces';

import { CONTACT_DATA } from './contact.data';
import { NAVIGATION_ITEMS } from './navigation.data';
import { SCHEDULE_ITEMS, SCHEDULE_NOTE } from './schedule.data';
import { HOME_SERVICES } from './services.data';

export const FOOTER_COLUMNS: Array<FooterColumn> = [
  {
    title: 'Navegación',
    variant: 'nav',
    items: NAVIGATION_ITEMS,
  },
  {
    title: 'Servicios',
    items: HOME_SERVICES,
  },
  {
    title: 'Contacto',
    variant: 'address',
    items: CONTACT_DATA.map(({ value, action }) => ({ label: value, action })),
  },
  {
    title: 'Horarios',
    items: [
      ...SCHEDULE_ITEMS.map(({ label, value }) => ({
        label: `${label}: ${value}`,
      })),
      {
        label: SCHEDULE_NOTE,
      },
    ],
  },
];
