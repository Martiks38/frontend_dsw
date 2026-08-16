import type { ServiceIconName } from '@/types';

import type { CardFeature } from './cardFeature.interface';

export interface Service extends CardFeature<ServiceIconName> {
  showOnHome: boolean;
}

export interface ServiceCard {
  title: string;
  imageSrc: string;
  imageAlt: string;
}
