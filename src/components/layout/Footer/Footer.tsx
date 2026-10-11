'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ComponentType, ReactNode } from 'react';

import { useToast } from '@/hooks/useToast.hook';
import type { FooterColumn, FooterItem, FooterProps } from '@/interfaces';
import { cn } from '@/lib/cn';
import { normalizeString } from '@/utils/normalizeString.util';

const baseInteractiveStyles =
  'hover:text-blue-900 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-900 w-full';

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
            className={cn(
              baseInteractiveStyles,
              'hover:border-primary w-fit border-b-2 border-transparent text-center transition-colors duration-200 lg:text-left'
            )}
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
          className={cn(
            baseInteractiveStyles,
            'hover:border-primary border-b-2 border-transparent transition-colors duration-200'
          )}
        >
          {item.label}
        </Link>
      );
    }

    case 'schedule': {
      return (
        <div className="flex flex-wrap justify-center gap-x-2 lg:justify-start">
          <span>{item.label}</span>
          <span className="whitespace-nowrap">{item.value}</span>
        </div>
      );
    }

    default: {
      const _exhaustive: never = item;
      return _exhaustive;
    }
  }
}

function FooterItemsList({ items }: { items: FooterItem[] }) {
  return (
    <ul className="m-[0_auto] flex w-max flex-col gap-y-2 font-medium lg:m-0">
      {items.map((item) => {
        return (
          // Aquí aplicamos el max-w-[25ch] junto con un ancho automático seguro
          <li key={item.label} className="w-auto max-w-[25ch] leading-relaxed">
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
      <h3 id={titleId} className="mb-4 text-lg font-semibold">
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
    <footer className="px-10 py-6 md:px-16 md:py-12">
      <div className="mx-auto mb-6 w-fit lg:mx-0">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={180}
          height={60}
          className="aspect-3/1 h-auto w-full object-contain"
        />
      </div>
      <div className="custom-lg:grid-cols-[repeat(4,auto)] grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:gap-10 lg:text-left">
        {columns.map((col) => {
          const titleId = `footer-${normalizeString(col.title)}`;
          const wrapperKey = col.variant === 'nav' ? 'nav' : 'default';
          const Wrapper = columnWrappers[wrapperKey];

          return (
            <Wrapper
              key={col.title}
              titleId={titleId}
              className="h-full sm:px-4"
            >
              <FooterColumnContent col={col} titleId={titleId} />
            </Wrapper>
          );
        })}
      </div>
    </footer>
  );
}
