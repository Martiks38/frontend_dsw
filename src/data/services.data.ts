import type { Service } from '@/interfaces';

export const services: Array<Service> = [
  {
    id: 'fuel',
    label: 'Combustible',
    show: true,
  },
  {
    id: 'cleaning',
    label: 'Limpieza',
    show: true,
  },
  {
    id: 'maintenance',
    label: 'Mantenimiento',
    show: true,
  },
  {
    id: 'launch-retrieval',
    label: 'Botadura y retiro',
    show: true,
  },
  {
    id: 'battery-charging',
    label: 'Carga de baterías',
    show: false,
  },
  {
    id: 'repairs',
    label: 'Reparaciones',
    show: false,
  },
];
