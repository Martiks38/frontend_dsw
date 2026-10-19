import {
  CalendarClock,
  HeartHandshake,
  ShieldCheck,
  Warehouse,
} from 'lucide-react';

import { CardFeature } from '@/interfaces';
import { type BenefitsIconName } from '@/types';

export const BENEFITS: CardFeature<BenefitsIconName>[] = [
  {
    id: 'security',
    icon: ShieldCheck,
    label: 'Seguridad',
    description: 'Instalaciones monitoreadas 24/7 para tu tranquilidad.',
  },
  {
    id: 'integral-care',
    icon: HeartHandshake,
    label: 'Cuidado integral',
    description:
      'Personal que cuida tu embarcación para mantenerla en excelentes condiciones.',
  },
  {
    id: 'secure-storage',
    icon: Warehouse,
    label: 'Guardado seguro',
    description: 'Espacios adecuados para cada tipo de embaración.',
  },
  {
    id: 'on-demand-availability',
    icon: CalendarClock,
    label: 'Cuando la necesitás',
    description:
      'Coordinamos el ingreso y retiro para que solo te preocupes por navegar.',
  },
];
