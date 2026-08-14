import type { AsideContactItem } from '@/interfaces/asideContact.interface';

import { CONTACT_DATA } from './contact.data';

const CONTACT_ICONS = {
  phone: 'phone',
  email: 'email',
  address: 'direction',
} as const;

export const ASIDE_CONTACT_ITEMS: AsideContactItem[] = CONTACT_DATA.map(
  (item) => ({
    ...item,
    icon: CONTACT_ICONS[item.type],
  })
);
