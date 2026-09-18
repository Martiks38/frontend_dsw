import { cn } from '@/lib/cn';
import { type IconName } from '@/types';

import Icon from '../Icon/Icon';

interface StatCardProps {
  label: string;
  value: string | number;
  helperText?: string;
  iconName: IconName;
  accent?: 'slate' | 'blue' | 'green' | 'amber';
}

const accentClasses: Record<NonNullable<StatCardProps['accent']>, string> = {
  slate: 'bg-slate-100 text-slate-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
};

export function StatCard({
  label,
  value,
  helperText,
  iconName,
  accent = 'slate',
}: StatCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          accentClasses[accent]
        )}
      >
        <Icon
          id={iconName}
          className="h-5 w-5"
          role={iconName === 'loader' ? 'status' : undefined}
          aria-label={iconName === 'loader' ? 'Cargando' : undefined}
          aria-hidden={iconName === 'loader' ? undefined : true}
        />
      </span>
      <div>
        <dt className="text-base text-slate-800">{label}</dt>
        <dd className="mt-1 text-2xl font-semibold text-slate-900">{value}</dd>
        {helperText && (
          <p className="mt-0.5 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    </div>
  );
}

interface StatGridProps {
  heading: string;
  children: React.ReactNode;
}

export function StatGrid({ heading, children }: StatGridProps) {
  const headingId = `stat-grid-${heading.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        {heading}
      </h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </dl>
    </section>
  );
}
