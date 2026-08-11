import type { HomeFeature } from '@/interfaces';

interface PageService extends HomeFeature {
  showOnHome: boolean;
}

interface PageServiceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const SERVICE_SCOPE: Array<{
  id: number;
  description: string;
}> = [
  {
    id: 1,
    description: 'Espacio de guardado en instalaciones seguras.',
  },
  {
    id: 2,
    description: 'Control de acceso y monitoreo 24/7.',
  },
  {
    id: 3,
    description: 'Gestión de ingreso y retiro.',
  },
  {
    id: 4,
    description: 'Supervisión de la embarcación.',
  },
];

export const PAGE_SERVICES: Array<PageServiceItem> = [
  {
    id: 'fuel',
    title: 'Combustible',
    description:
      'Carga de combustible para que tu embarcación esté siempre lista.',
    imageSrc: '/images/services-fuel.jpg',
    imageAlt: 'Operario realizando carga de combustible en una embarcación',
  },
  {
    id: 'cleaning',
    title: 'Limpieza',
    description: 'Limpieza exterior e interior profesional.',
    imageSrc: '/images/services-cleaning.jpg',
    imageAlt: 'Trabajo de limpieza y pulido exterior de casco de embarcación',
  },
  {
    id: 'maintenance',
    title: 'Mantenimiento',
    description: 'Revisiones y mantenimiento preventivo.',
    imageSrc: '/images/services-maintenance.jpg',
    imageAlt: 'Inspección técnica del motor y componentes mecánicos',
  },
  {
    id: 'battery-charging',
    title: 'Carga de baterías',
    description: 'Control y carga de baterías durante el guardado.',
    imageSrc: '/images/services-battery-charging.jpg',
    imageAlt: 'Baterías náuticas conectadas en estación de carga',
  },
  {
    id: 'launch-retrieval',
    title: 'Botadura y retiro',
    description: 'Servicio de botadura y retiro de agua.',
    imageSrc: '/images/services-launch-retrieval.jpg',
    imageAlt: 'Grúa náutica elevando una lancha para botadura al agua',
  },
  {
    id: 'repairs',
    title: 'Reparaciones',
    description: 'Gestión de reparaciones y trabajos técnicos.',
    imageSrc: '/images/services-repairs.jpg',
    imageAlt: 'Área de taller y mantenimiento para reparación de embarcaciones',
  },
];

export const HOME_SERVICES: Array<PageService> = [
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
