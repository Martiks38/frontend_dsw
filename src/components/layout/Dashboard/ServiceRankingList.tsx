import { type ServiceRankingItem } from '@/interfaces/dashboard.interface';

interface ServiceRankingListProps {
  title: string;
  items: ServiceRankingItem[];
}

export function ServiceRankingList({ title, items }: ServiceRankingListProps) {
  const headingId = `ranking-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      aria-labelledby={headingId}
      className="bg-surface rounded-xl border border-slate-200 p-5 shadow-sm"
    >
      <h2
        id={headingId}
        className="mb-4 text-base font-semibold text-slate-900"
      >
        {title}
      </h2>
      <ol className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-slate-700">{item.name}</span>
            <span className="font-medium text-slate-900">{item.count}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
