'use client';

import { useToast } from '@/hooks/useToast.hook';
import type { ContactItem } from '@/interfaces';

import Icon from '../Icon/Icon';

function ContactInfoItem({
  item,
  className,
}: {
  item: ContactItem;
  className?: string;
}) {
  const showToast = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.value.replaceAll(' ', ''));
    showToast('Copiado al portapapeles');
  };

  return (
    <li className={`${className} flex items-start gap-6`}>
      <Icon
        id={item.type}
        title={item.label}
        size={32}
        className="mt-0.5 shrink-0"
      />
      <div>
        <h3 className="mb-2 text-lg font-semibold">{item.label}</h3>

        {item.action === 'copy' ? (
          <button
            type="button"
            onClick={handleCopy}
            className="'hover:text-blue-900 w-full' rounded text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-900"
          >
            {item.value}
          </button>
        ) : (
          <p className="leading-8">{item.value}</p>
        )}
      </div>
    </li>
  );
}

export default function ContactInfoPanel({ items }: { items: ContactItem[] }) {
  return (
    <address className="not-italic">
      <ul className="flex flex-col gap-y-7" role="list">
        {items.map((item, ind) => (
          <ContactInfoItem
            key={item.label}
            item={item}
            className={ind === items.length - 1 ? '-order-1' : ''}
          />
        ))}
      </ul>
    </address>
  );
}
