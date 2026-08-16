import type { IconName } from '@/types';

export interface CardFeature<TId extends IconName = IconName> {
  id: TId;
  label: string;
  description: string;
}
