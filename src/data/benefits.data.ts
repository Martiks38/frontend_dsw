import { CardFeature } from '@/interfaces';
import type { BenefitsIconName } from '@/types';

export const BENEFITS: CardFeature<BenefitsIconName>[] = [
  {
    id: 'security',
    label: 'Seguridad',
    description: 'Instalaciones monitoreadas 24/7 para tu tranquilidad.',
  },
  {
    id: 'integral-care',
    label: 'Cuidado integral',
    description:
      'Personal que cuida tu embarcación para mantenerla en excelentes condiciones.',
  },
  {
    id: 'secure-storage',
    label: 'Guardado seguro',
    description: 'Espacios adecuados para cada tipo de embaración.',
  },
  {
    id: 'on-demand-availability',
    label: 'Cuando la necesitás',
    description:
      'Coordinamos el ingreso y retiro para que solo te preocupes por navegar.',
  },
];
