import type { ContactItem } from '@/interfaces/contact.interface';

export const CONTACT_ITEMS: Array<ContactItem> = [
  {
    type: 'phone',
    label: 'Teléfono',
    value: '+54 341 123 4567',
    action: 'copy',
  },
  {
    type: 'email',
    label: 'Email',
    value: 'info@guarderianautica.com',
    action: 'copy',
  },
  {
    type: 'address',
    label: 'Dirección',
    value: 'Av. Costanera 1234, Rosario, Santa Fe',
  },
];
