import {
  Anchor,
  BatteryCharging,
  Fuel,
  Hammer,
  Sparkles,
  Wrench,
} from 'lucide-react';

import { ServiceCatalogItem } from '@/interfaces';

export const SERVICES_CATALOG: ServiceCatalogItem[] = [
  {
    id: 'combustible',
    name: 'Combustible',
    description: 'Carga de combustible con productos de alta calidad.',
    icon: Fuel,
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    description:
      'Limpieza exterior e interior para que tu embarcación luzca siempre impecable.',
    icon: Sparkles,
  },
  {
    id: 'mantenimiento',
    name: 'Mantenimiento',
    description:
      'Mantenimiento preventivo y correctivo realizado por profesionales.',
    icon: Wrench,
  },
  {
    id: 'botadura-retiro',
    name: 'Botadura y retiro',
    description: 'Servicio de botadura y retiro de embarcaciones.',
    icon: Anchor,
  },
  {
    id: 'carga-baterias',
    name: 'Carga de baterías',
    description: 'Carga y chequeo de baterías para un rendimiento óptimo.',
    icon: BatteryCharging,
  },
  {
    id: 'reparaciones',
    name: 'Reparaciones',
    description: 'Reparaciones mecánicas y eléctricas en general.',
    icon: Hammer,
  },
];
