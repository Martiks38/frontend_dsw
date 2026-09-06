'use client';

import { usePathname } from 'next/navigation';

import { DASHBOARD_NAV } from '@/data';
import { type UserRole } from '@/lib/auth';

export function PageTitle({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const currentPage = DASHBOARD_NAV.find(
    (item) => item.href === pathname && item.roles.includes(role)
  );

  return (
    <h1 className="text-xl font-semibold text-slate-900">
      {currentPage?.label ?? 'Dashboard'}
    </h1>
  );
}
