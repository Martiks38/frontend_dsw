import type { ContactItem } from '@/interfaces/contact.interface';

export const CONTACT_DATA: Array<ContactItem> = [
  {
    type: 'phone',
    label: 'Teléfono',
    value: '+54 341 123 4567',
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
