import Image from 'next/image';
import { ComponentType, ReactNode } from 'react';

import { useToast } from '@/hooks/useToast.hook';
import type { FooterColumn, FooterProps } from '@/interfaces';
import { normalizeString } from '@/utils/normalizeString.util';

const columnWrappers: Record<
  'nav' | 'default',
  ComponentType<{ titleId: string; children: ReactNode }>
> = {
  nav: ({ titleId, children }) => (
    <nav aria-labelledby={titleId}>{children}</nav>
  ),
  default: ({ children }) => <section>{children}</section>,
};

function FooterItemContent({ item }: { item: FooterColumn['items'][number] }) {
  const showToast = useToast();

  if (item.action === 'copy') {
    const handleCopy = async () => {
      await navigator.clipboard.writeText(item.label);
      showToast('Copiado al portapapeles');
    };

    return (
      <button onClick={handleCopy} type="button">
        {item.label}
      </button>
    );
  }

  return item.href ? <a href={item.href}>{item.label}</a> : <>{item.label}</>;
}

function FooterItemsList({ items }: { items: FooterColumn['items'] }) {
  return (
    <ul>
      {items.map((item, ind) => (
        <li key={ind}>
          <FooterItemContent item={item} />
        </li>
      ))}
    </ul>
  );
}

function FooterColumnContent({
  col,
  titleId,
}: {
  col: FooterColumn;
  titleId: string;
}) {
  return (
    <>
      <h3 id={titleId}>{col.title}</h3>
      <ul>
        {col.items.map((item, ind) => (
          <li key={ind}>
            <FooterItemContent item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Footer({ columns, logoSrc, logoAlt }: FooterProps) {
  return (
    <footer>
      <Image src={logoSrc} alt={logoAlt} width={32} height={32} />
      {columns.map((col) => {
        const normalizedTitle = normalizeString(col.title);
        const titleId = `footer-${normalizedTitle}`;

        if (col.variant === 'address') {
          return (
            <section key={col.title}>
              <h3 id={titleId}>{col.title}</h3>
              <address>
                <FooterItemsList items={col.items} />
              </address>
            </section>
          );
        }

        const Wrapper = columnWrappers[col.variant ?? 'default'];

        return (
          <Wrapper key={col.title} titleId={titleId}>
            <FooterColumnContent col={col} titleId={titleId} />
          </Wrapper>
        );
      })}
    </footer>
  );
}
