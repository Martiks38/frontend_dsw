import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  helperText?: string;
  icon: LucideIcon;
  accent?: 'slate' | 'blue' | 'green' | 'red' | 'amber';
}

const accentClasses: Record<NonNullable<StatCardProps['accent']>, string> = {
  slate: 'bg-slate-100 text-slate-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-emerald-100 text-emerald-600',
  red: 'bg-red-100 text-red-600',
  amber: 'bg-amber-100 text-amber-600',
};

export function StatCard({
  label,
  value,
  helperText,
  icon: IconComponent,
  accent = 'slate',
}: StatCardProps) {
  const isLoader = IconComponent.name?.toLowerCase().includes('loader');

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          accentClasses[accent]
        )}
      >
        <IconComponent
          className="h-5 w-5"
          role={isLoader ? 'status' : undefined}
          aria-label={isLoader ? 'Cargando' : undefined}
          aria-hidden={isLoader ? undefined : true}
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
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </dl>
    </section>
  );
}
