import type { Service } from '@/interfaces';

export const services: Array<Service> = [
  {
    id: 'fuel',
    label: 'Combustible',
    showOnHome: true,
    description:
      'Carga de combustible para que tu embaracación esté siempre lista.',
  },
  {
    id: 'cleaning',
    label: 'Limpieza',
    showOnHome: true,
    description: 'Limpieza exterior e interior profesional.',
  },
  {
    id: 'maintenance',
    label: 'Mantenimiento',
    showOnHome: true,
    description: 'Revisiones y mantenimiento preventivo.',
  },
  {
    id: 'boat-launch-and-retrieval',
    label: 'Botadura y retiro',
    showOnHome: true,
    description: 'Servicio de botadura y retiro de agua.',
  },
  {
    id: 'battery-charging',
    label: 'Carga de baterías',
    showOnHome: false,
    description: 'Control y carga de baterías durante el guardado.',
  },
  {
    id: 'repairs',
    label: 'Reparaciones',
    showOnHome: false,
    description: 'Gestión de reparaciones y trabajos técnicos.',
  },
];
