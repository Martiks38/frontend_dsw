'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATION_ITEMS } from '@/data';
import { cn } from '@/lib/cn';

import styles from './headernav.module.css';

interface HeaderNavProps {
  className?: string;
  onItemClick?: () => void;
}

export function HeaderNav({ className, onItemClick }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal">
      <ul className={cn('flex justify-between gap-2', className)}>
        {NAVIGATION_ITEMS.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={label}>
              <Link
                className={cn(
                  styles.link,
                  'px-2 py-1',
                  isActive && styles.activedLink
                )}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                onClick={onItemClick}
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
