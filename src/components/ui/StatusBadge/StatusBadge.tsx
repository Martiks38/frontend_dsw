import { type RequestStatus } from '@/interfaces/dashboard.interface';

const STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; className: string }
> = {
  PENDING: { label: 'Pendiente', className: 'bg-amber-100 text-amber-800' },
  SCHEDULED: { label: 'Programada', className: 'bg-sky-100 text-sky-800' },
  IN_PROGRESS: { label: 'En proceso', className: 'bg-blue-100 text-blue-800' },
  COMPLETED: {
    label: 'Completada',
    className: 'bg-emerald-100 text-emerald-800',
  },
  CANCELED: { label: 'Cancelada', className: 'bg-slate-200 text-slate-600' },
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
