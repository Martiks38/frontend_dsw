import type { CardItem } from '@/components/ui/CardGrid/CardGrid';
import type { Service, ServiceCard } from '@/interfaces/service.interface';
import type { ServiceIconName } from '@/types';

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

export const PAGE_SERVICE_MEDIA: Record<
  ServiceIconName,
  Pick<ServiceCard, 'title' | 'imageSrc' | 'imageAlt'>
> = {
  cleaning: {
    title: 'Limpieza',
    imageSrc: '/images/services/services-cleaning.webp',
    imageAlt: 'Trabajo de limpieza y pulido exterior de casco de embarcación',
  },
  fuel: {
    title: 'Combustible',
    imageSrc: '/images/services/services-fuel.webp',
    imageAlt: 'Operario realizando carga de combustible en una embarcación',
  },
  maintenance: {
    title: 'Mantenimiento',
    imageSrc: '/images/services/services-maintenance.webp',
    imageAlt: 'Inspección técnica del motor y componentes mecánicos',
  },
  'boat-launch-and-retrieval': {
    title: 'Botadura y retiro',
    imageSrc: '/images/services/services-launch-retrieval.webp',
    imageAlt: 'Grúa náutica elevando una lancha para botadura al agua',
  },
  'battery-charging': {
    title: 'Carga de baterías',
    imageSrc: '/images/services/services-battery-charging.webp',
    imageAlt: 'Baterías náuticas conectadas en estación de carga',
  },
  repairs: {
    title: 'Reparaciones',
    imageSrc: '/images/services/services-repairs.webp',
    imageAlt: 'Área de taller y mantenimiento para reparación de embarcaciones',
  },
};

export const SERVICES: Service[] = [
  {
    id: 'fuel',
    label: 'Combustible',
    showOnHome: true,
    description:
      'Carga de combustible para que tu embarcación esté siempre lista.',
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

export const HOME_SERVICES: Array<Service> = SERVICES.filter(
  (s) => s.showOnHome
);

export const PAGE_SERVICES: Array<CardItem> = SERVICES.map((s) => ({
  ...s,
  ...PAGE_SERVICE_MEDIA[s.id],
}));
