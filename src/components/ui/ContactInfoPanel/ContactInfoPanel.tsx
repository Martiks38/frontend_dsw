import { type ContactItem } from '@/interfaces';
import { cn } from '@/lib/cn';

import { CopyButton } from '../Button/CopyButton';

function ContactInfoItem({
  item,
  className,
}: {
  item: ContactItem;
  className?: string;
}) {
  const { label, value, action, icon: Icon } = item;

  return (
    <li className={cn('flex items-start gap-6', className)}>
      <div className="xs:block hidden">
        <Icon aria-hidden="true" className="mt-0.5 h-8 w-8 shrink-0" />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">{label}</h3>

        {action === 'copy' ? (
          <CopyButton value={value} />
        ) : (
          <p className="leading-8">{value}</p>
        )}
      </div>
    </li>
  );
}

export function ContactInfoPanel({ items }: { items: ContactItem[] }) {
  return (
    <address className="not-italic">
      <ul className="flex flex-col gap-y-7" role="list">
        {items.map((item) => (
          <ContactInfoItem
            key={item.label}
            item={item}
            className="last:-order-1"
          />
        ))}
      </ul>
    </address>
  );
}
