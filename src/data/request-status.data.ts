import { type RequestStatus } from '@/interfaces';

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: 'Pendiente',
  SCHEDULED: 'Programada',
  IN_PROGRESS: 'En proceso',
  COMPLETED: 'Completada',
  CANCELED: 'Cancelada',
};
