'use client';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { DASHBOARD_SIDEBAR_NAV } from '@/data';
import { useSession } from '@/hooks/useSession.hook';
import { cn } from '@/lib/cn';

import { Logout } from '../Logout/Logout';

const NAV_ID = 'dashboard-sidebar-nav';

const MOBILE_QUERY = '(max-width: 640px)';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useSession();
  const role = user?.role;

  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const itemsVisibles = role
    ? DASHBOARD_SIDEBAR_NAV.filter((item) => item.roles.includes(role))
    : [];

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        rootRef.current?.contains(document.activeElement)
      ) {
        setExpanded(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [expanded]);

  const collapseOnMobile = () => {
    if (window.matchMedia(MOBILE_QUERY).matches) setExpanded(false);
  };

  return (
    <div
      ref={rootRef}
      data-expanded={expanded}
      className={cn(
        'peer bg-primary text-surface sticky top-0 flex h-dvh shrink-0 flex-col gap-8 self-start overflow-x-hidden overflow-y-auto whitespace-nowrap',
        'transition-[width,padding] duration-200 motion-reduce:transition-none',
        expanded ? 'w-full p-8 py-2 pr-6 sm:w-74' : 'w-18 p-2'
      )}
    >
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={expanded}
        aria-controls={NAV_ID}
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors',
          'hover:bg-white/5 hover:text-white',
          focusRing,
          expanded ? 'self-end' : 'self-center'
        )}
      >
        {expanded ? (
          <ChevronsLeft className="h-6 w-6" aria-hidden="true" />
        ) : (
          <ChevronsRight className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="sr-only">Menú de navegación</span>
      </button>

      <Link
        href="/"
        onClick={collapseOnMobile}
        className={cn(
          'block rounded-xl',
          focusRing,
          expanded ? 'w-fit' : 'self-center'
        )}
      >
        {expanded ? (
          <div className="max-w-48 rounded-xl bg-slate-100 p-4 lg:w-full">
            <Image
              src="/logo_2.png"
              alt="Inicio - Guardería náutica"
              width={195}
              height={65}
              className="h-auto w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 p-2">
            <Image
              src="/logo.png"
              alt="Inicio - Guardería náutica"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </Link>

      <nav id={NAV_ID} aria-label="Secciones del panel">
        <ul className="text-surface space-y-2" role="list">
          {itemsVisibles.map((item) => {
            const active = pathname === item.href;
            const ItemIcon = item.icon;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={collapseOnMobile}
                  title={expanded ? undefined : item.label}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-3 overflow-hidden rounded-md px-4 py-2 transition-colors',
                    focusRing,

                    active
                      ? 'bg-[#0b376dcc] after:absolute after:bottom-0 after:left-0 after:h-full after:w-1.5 after:bg-cyan-400 after:content-[""]'
                      : 'border-transparent hover:bg-white/5 hover:text-white'
                  )}
                >
                  <ItemIcon className="h-6 w-6 shrink-0" aria-hidden="true" />

                  <span className={cn(!expanded && 'sr-only')}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        <Logout
          iconVisible={true}
          labelVisible={expanded}
          className={cn(
            'rounded-md px-3 py-2 text-slate-300 transition-colors',
            'hover:text-white',
            focusRing
          )}
        />
      </div>
    </div>
  );
}
