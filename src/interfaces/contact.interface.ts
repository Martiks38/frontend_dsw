import type { ContactIconName } from '@/types';

export interface ContactItem {
  type: ContactIconName;
  label: string;
  value: string;
  action?: 'copy';
}
