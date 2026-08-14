import type { ScheduleItem } from '@/interfaces/schedule.interface';

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { label: 'Lun, Mié, Jue y Vie', value: ' 08:00 - 20:00' },
  { label: 'Sáb, dom y feriados', value: '08:00 - 19:00' },
];

export const SCHEDULE_NOTE =
  'Última bajada de embarcaciones 30 min. antes del cierre.';
