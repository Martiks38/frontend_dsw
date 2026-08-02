'use client';

import Image from 'next/image';
import { ComponentType, ReactNode } from 'react';

import { useToast } from '@/hooks/useToast.hook';
import type { FooterColumn, FooterProps } from '@/interfaces';
import { normalizeString } from '@/utils/normalizeString.util';

const columnWrappers: Record<
  'nav' | 'default',
  ComponentType<{ titleId: string; className: string; children: ReactNode }>
> = {
  nav: ({ titleId, className, children }) => (
    <nav className={className ?? ''} aria-labelledby={titleId}>
      {children}
    </nav>
  ),
  default: ({ titleId, className, children }) => (
    <section className={className ?? ''} aria-labelledby={titleId}>
      {children}
    </section>
  ),
};

const titleStyles = 'font-semibold text-lg mb-2.5';

function FormattedItemText({ text }: { text: string }) {
  if (text.includes(':') && text.includes('-')) {
    const parts = text.split(/:(.+)/);

    if (parts.length >= 2) {
      const dayLabel = parts[0];
      const timeRange = parts[1].trim();

      return (
        <>
          {dayLabel}:{' '}
          <span className="inline-block whitespace-nowrap">{timeRange}</span>
        </>
      );
    }
  }
  return <>{text}</>;
}

function FooterItemContent({ item }: { item: FooterColumn['items'][number] }) {
  const showToast = useToast();

  const baseInteractiveStyles =
    'hover:text-blue-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-900 rounded text-left w-full';

  if (item.action === 'copy') {
    const handleCopy = async () => {
      await navigator.clipboard.writeText(item.label);
      showToast('Copiado al portapapeles');
    };

    return (
      <button
        onClick={handleCopy}
        type="button"
        className={baseInteractiveStyles}
      >
        <FormattedItemText text={item.label} />
      </button>
    );
  }

  if (item.href) {
    const isPhone = item.href.startsWith('tel:');
    const isEmail = item.href.startsWith('mailto:');
    const ariaLabel = isPhone
      ? `Llamar al teléfono ${item.label}`
      : isEmail
        ? `Enviar un correo electrónico a ${item.label}`
        : undefined;

    return (
      <a
        href={item.href}
        className={baseInteractiveStyles}
        aria-label={ariaLabel}
      >
        <FormattedItemText text={item.label} />
      </a>
    );
  }

  return <FormattedItemText text={item.label} />;
}

function FooterItemsList({ items }: { items: FooterColumn['items'] }) {
  return (
    <ul className="flex flex-col gap-y-1.5 font-medium">
      {items.map((item, ind) => (
        <li key={ind} className="leading-relaxed">
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
      <h3 id={titleId} className={titleStyles}>
        {col.title}
      </h3>
      <FooterItemsList items={col.items} />
    </>
  );
}

export default function Footer({ columns, logoSrc, logoAlt }: FooterProps) {
  return (
    <footer className="grid grid-cols-1 items-start gap-8 px-6 pt-12 pb-6 sm:grid-cols-2 md:grid-cols-5">
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={195}
        height={65}
        className="h-auto w-full max-w-45 object-contain"
        priority
      />
      {columns.map((col) => {
        const normalizedTitle = normalizeString(col.title);
        const titleId = `footer-${normalizedTitle}`;

        if (col.variant === 'address') {
          return (
            <section
              className="h-full"
              key={col.title}
              aria-labelledby={titleId}
            >
              <h3 className={titleStyles} id={titleId}>
                {col.title}
              </h3>
              <address className="not-italic">
                <FooterItemsList items={col.items} />
              </address>
            </section>
          );
        }

        const Wrapper = columnWrappers[col.variant ?? 'default'];

        return (
          <Wrapper key={col.title} titleId={titleId} className="h-full">
            <FooterColumnContent col={col} titleId={titleId} />
          </Wrapper>
        );
      })}
    </footer>
  );
}
