import { type LucideIcon } from 'lucide-react';

import { type ContactIconName } from '@/types';

export interface ContactItem {
  type: ContactIconName;
  icon: LucideIcon;
  label: string;
  value: string;
  action?: 'copy';
}
