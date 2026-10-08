'use client';

import { useToast } from '@/hooks/useToast.hook';
import { type ContactItem } from '@/interfaces';
import { cn } from '@/lib/cn';

function ContactInfoItem({
  item,
  className,
}: {
  item: ContactItem;
  className?: string;
}) {
  const showToast = useToast();
  const { label, value, action } = item;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.value.replaceAll(' ', ''));
    showToast('Copiado al portapapeles');
  };

  return (
    <li className={`${className} flex items-start gap-6`}>
      {/* <Icon aria-hidden="true" size={32} className="mt-0.5 shrink-0" /> */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">{label}</h3>

        {action === 'copy' ? (
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'w-full rounded text-left transition-colors duration-200',
              'hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-blue-900'
            )}
          >
            {value}
          </button>
        ) : (
          <p className="leading-8">{value}</p>
        )}
      </div>
    </li>
  );
}

export default function ContactInfoPanel({ items }: { items: ContactItem[] }) {
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
