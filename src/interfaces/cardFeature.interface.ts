import { type LucideIcon } from 'lucide-react';

export interface CardFeature<TId extends string = string> {
  id: TId;
  icon: LucideIcon;
  label: string;
  description: string;
}
