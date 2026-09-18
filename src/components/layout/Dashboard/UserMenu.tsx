'use client';

import Link from 'next/link';
import { useState } from 'react';

import Icon from '@/components/ui/Icon/Icon';
import { Logout } from '@/components/ui/Logout/Logout';
import { cn } from '@/lib/cn';

const styles = {
  menuButton: cn(
    'rounded-md px-4 py-2',
    'hover:bg-slate-300 focus-visible:bg-slate-200'
  ),
};

export function UserMenu({
  userName,
  roleLabel,
}: {
  userName: string;
  roleLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'flex items-center gap-2 rounded-lg px-2 py-1',
          'hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none'
        )}
      >
        <Icon id="user-circle" className="h-8 w-8 text-slate-400" />
        <span className="text-left">
          <span className="block text-sm font-semibold text-slate-900">
            {userName}
          </span>
          <span className="block text-xs text-slate-700">{roleLabel}</span>
        </span>
        <Icon
          id="chevron-down"
          className="bg-surface h-6 w-6 py-1 text-slate-900 shadow-lg"
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 mt-2 w-max divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
        >
          <li role="none" className="mb-1">
            <Link
              href="/dashboard/perfil"
              role="menuitem"
              className={cn(
                'mb-1 block rounded-md px-4 py-2',
                'hover:bg-slate-300 focus-visible:bg-slate-200'
              )}
            >
              Perfil
            </Link>
          </li>

          <li role="none">
            <Logout
              iconVisible={true}
              role="menuitem"
              className={styles.menuButton}
            />
          </li>
        </ul>
      )}
    </div>
  );
}
