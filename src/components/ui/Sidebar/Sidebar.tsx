'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DASHBOARD_NAV } from '@/data';
import { useSession } from '@/hooks/useSession.hook';
import { cn } from '@/lib/cn';

import Icon from '../Icon/Icon';
import { Logout } from '../Logout/Logout';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useSession();
  const role = user?.role;

  const itemsVisibles = role
    ? DASHBOARD_NAV.filter((item) => item.roles.includes(role))
    : [];

  return (
    <aside
      aria-label="Navegación principal"
      className="bg-primary text-surface sticky top-0 flex h-screen w-74 shrink-0 flex-col justify-start gap-8 self-start p-8 pr-6"
    >
      <div className="max-w-48 rounded-xl bg-slate-100 p-4 lg:w-full">
        <Image
          src="/logo_2.png"
          alt="Guardería náutica"
          width={195}
          height={65}
          className="h-auto w-full object-contain"
        />
      </div>
      <nav aria-label="Secciones de disponibles">
        <ul className="text-surface space-y-2">
          {itemsVisibles.map((item) => {
            const active = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-3 overflow-hidden rounded-md px-4 py-2 transition-colors',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',

                    active
                      ? 'bg-[#0b376dcc] after:absolute after:bottom-0 after:left-0 after:h-full after:w-1.5 after:bg-cyan-400 after:content-[""]'
                      : 'border-transparent hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon id={item.iconId} className="h-6 w-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto">
        <Logout
          iconVisible={true}
          className={cn(
            'rounded-md px-3 py-2 text-slate-300 transition-colors',
            'hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
          )}
        />
      </div>
    </aside>
  );
}
