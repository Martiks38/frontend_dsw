import { Mail, MapPin, Phone } from 'lucide-react';

import { type ContactItem } from '@/interfaces/contact.interface';

export const CONTACT_ITEMS: Array<ContactItem> = [
  {
    type: 'phone',
    icon: Phone,
    label: 'Teléfono',
    value: '+54 341 123 4567',
    action: 'copy',
  },
  {
    type: 'email',
    icon: Mail,
    label: 'Email',
    value: 'info@guarderianautica.com',
    action: 'copy',
  },
  {
    type: 'location',
    icon: MapPin,
    label: 'Dirección',
    value: 'Av. Costanera 1234, Rosario, Santa Fe',
  },
];
