import { type LucideIcon } from 'lucide-react';

import { UserRole } from '@/lib/auth';

import { type LinkItem } from './navigation.interface';

export interface NavIconItem extends LinkItem {
  icon: LucideIcon;
  roles: UserRole[];
  helperText?: Partial<Record<UserRole, string>>;
}
