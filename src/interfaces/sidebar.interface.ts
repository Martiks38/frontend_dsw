import { UserRole } from '@/lib/auth';
import { type IconName } from '@/types';

import { type LinkItem } from './navigation.interface';

export interface NavIconItem extends LinkItem {
  iconId: IconName;
  roles: UserRole[];
  helperText?: string;
}
