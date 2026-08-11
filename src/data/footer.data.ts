import type { FooterColumn } from '@/interfaces';

import { NAVIGATION_ITEMS } from './navigation.data';
import { SERVICES } from './services.data';

export const FOOTER_COLUMNS: Array<FooterColumn> = [
  {
    title: 'Navegación',
    variant: 'nav',
    items: NAVIGATION_ITEMS,
  },
  {
    title: 'Servicios',
    items: SERVICES,
  },
  {
    title: 'Contacto',
    variant: 'address',
    items: [
      {
        label: '+54 341 123 4567',
        action: 'copy',
      },
      {
        label: 'info@guarderianautica.com',
        action: 'copy',
      },
      {
        label: 'Av. Costanera 1234, Rosario, Santa Fe',
      },
    ],
  },
  {
    title: 'Horarios',
    items: [
      { label: 'Lun, Mié, Jue y Vie: 08:00 - 20:00' },
      { label: 'Sáb, dom y feriados: 08:00 - 19:00' },
      { label: 'Última bajada de embarcaciones 30 min. antes del cierre.' },
    ],
  },
];
