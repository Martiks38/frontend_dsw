import type { IconName } from '@/types';

import type { ContactItem } from './contact.interface';
import type { ScheduleItem } from './schedule.interface';

export interface AsideContactItem extends ContactItem {
  icon: IconName;
}

export interface AsideSchedule {
  icon: IconName;
  items: ScheduleItem[];
}
