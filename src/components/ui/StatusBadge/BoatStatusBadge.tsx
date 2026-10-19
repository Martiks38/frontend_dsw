import type { BoatAdminStatus } from '@/interfaces';

const CONFIG: Record<BoatAdminStatus, { label: string; className: string }> = {
  EN_GUARDIA: {
    label: 'En guardería',
    className: 'bg-emerald-100 text-emerald-800',
  },
  EN_AGUA: { label: 'En agua', className: 'bg-sky-100 text-sky-800' },
  EN_MANTENIMIENTO: {
    label: 'En mantenimiento',
    className: 'bg-amber-100 text-amber-800',
  },
};

export function BoatStatusBadge({ status }: { status: BoatAdminStatus }) {
  const config = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      <span className="sr-only">Estado: </span>
      {config.label}
    </span>
  );
}
