import Image from 'next/image';
import { ComponentType, ReactNode } from 'react';

import { useToast } from '@/hooks/useToast.hook';
import type { FooterColumn, FooterProps } from '@/interfaces';

type ColumnWrapperProps = { col: FooterColumn; children: ReactNode };

const columnWrappers: Record<
  'nav' | 'address' | 'default',
  ComponentType<ColumnWrapperProps>
> = {
  nav: ({ col, children }) => (
    <nav
      aria-labelledby={`footer-
        ${col.title}`}
    >
      {children}
    </nav>
  ),
  address: ({ children }) => <address>{children}</address>,
  default: ({ children }) => <section>{children}</section>,
};

function FooterItemContent({ item }: { item: FooterColumn['items'][number] }) {
  const showToast = useToast();

  if (item.action === 'copy') {
    const handleCopy = async () => {
      await navigator.clipboard.writeText(item.label);
      showToast(item.label);
    };

    return (
      <button onClick={handleCopy} type="button" className="">
        {item.label}
      </button>
    );
  }

  return item.href ? <a href={item.href}>{item.label}</a> : <>{item.label}</>;
}

function FooterColumnContent({ col }: { col: FooterColumn }) {
  return (
    <>
      <h3>{col.title}</h3>
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
        const Wrapper = columnWrappers[col.variant ?? 'default'];

        return (
          <Wrapper key={col.title} col={col}>
            <FooterColumnContent col={col} />
          </Wrapper>
        );
      })}
    </footer>
  );
}
