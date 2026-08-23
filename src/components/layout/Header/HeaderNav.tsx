'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATION_ITEMS } from '@/data';

import styles from './headernav.module.css';

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal">
      <ul className="flex justify-between gap-x-1">
        {NAVIGATION_ITEMS.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={label}>
              <Link
                className={`px-2 py-1 ${styles.link} ${isActive ? styles.activedLink : ''}`}
                href={href}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
