'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentType, ReactNode } from 'react';

import { useToast } from '@/hooks/useToast.hook';
import type { FooterColumn, FooterItem, FooterProps } from '@/interfaces';
import { normalizeString } from '@/utils/normalizeString.util';

import styles from './Footer.module.css';

const titleStyles = 'font-semibold text-lg mb-4';
const baseInteractiveStyles =
  'hover:text-blue-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-900 text-left w-full';

function FooterItemContent({ item }: { item: FooterItem }) {
  const showToast = useToast();

  switch (item.kind) {
    case 'text': {
      if (item.action === 'copy') {
        const handleCopy = async () => {
          await navigator.clipboard.writeText(item.label.replaceAll(' ', ''));
          showToast('Copiado al portapapeles');
        };

        return (
          <button
            onClick={handleCopy}
            type="button"
            className={`${baseInteractiveStyles} hover:border-primary border-b-2 border-transparent transition-colors duration-200`}
          >
            {item.label}
          </button>
        );
      }

      return <>{item.label}</>;
    }

    case 'link': {
      return (
        <Link
          href={item.href}
          className={`${baseInteractiveStyles} hover:border-primary border-b-2 border-transparent transition-colors duration-200`}
        >
          {item.label}
        </Link>
      );
    }

    case 'schedule': {
      return (
        <>
          {item.label}{' '}
          <span className="inline-block whitespace-nowrap">{item.value}</span>
        </>
      );
    }
  }
}

function FooterItemsList({ items }: { items: FooterItem[] }) {
  return (
    <ul className="flex flex-col gap-y-1.5 font-medium">
      {items.map((item) => {
        return (
          <li key={item.label} className="leading-relaxed">
            <FooterItemContent item={item} />
          </li>
        );
      })}
    </ul>
  );
}

const columnWrappers: Record<
  'nav' | 'default',
  ComponentType<{ titleId: string; className: string; children: ReactNode }>
> = {
  nav: ({ titleId, className, children }) => (
    <nav className={className} aria-labelledby={titleId}>
      {children}
    </nav>
  ),
  default: ({ titleId, className, children }) => (
    <section className={className} aria-labelledby={titleId}>
      {children}
    </section>
  ),
};

function FooterColumnContent({
  col,
  titleId,
}: {
  col: FooterColumn;
  titleId: string;
}) {
  const list = <FooterItemsList items={col.items} />;

  return (
    <>
      <h3 id={titleId} className={titleStyles}>
        {col.title}
      </h3>
      {col.variant === 'address' ? (
        <address className="not-italic">{list}</address>
      ) : (
        list
      )}
    </>
  );
}

export default function Footer({ columns, logoSrc, logoAlt }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className="max-w-48 lg:w-full">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={195}
          height={65}
          className="h-auto w-full object-contain"
        />
      </div>
      {columns.map((col) => {
        const titleId = `footer-${normalizeString(col.title)}`;
        const wrapperKey = col.variant === 'nav' ? 'nav' : 'default';
        const Wrapper = columnWrappers[wrapperKey];

        return (
          <Wrapper key={col.title} titleId={titleId} className="h-full">
            <FooterColumnContent col={col} titleId={titleId} />
          </Wrapper>
        );
      })}
    </footer>
  );
}
