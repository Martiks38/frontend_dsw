import type { ServiceIconName } from '@/types';

export interface Service {
  id: ServiceIconName;
  label: string;
  description: string;
  showOnHome: boolean;
}

export interface ServiceCard {
  title: string;
  imageSrc: string;
  imageAlt: string;
}
