'use client';

import { usePathname } from 'next/navigation';

import { DASHBOARD_PAGE_TITLE } from '@/data';
import { type UserRole } from '@/lib/auth';

export function PageTitle({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const currentPage = DASHBOARD_PAGE_TITLE.find(
    (item) => item.href === pathname && item.roles.includes(role)
  );

  return (
    <div>
      <h1
        id="dashboard-heading"
        className="text-xl font-semibold text-slate-900"
      >
        {currentPage?.label ?? 'Dashboard'}
      </h1>
      {currentPage?.helperText && (
        <p className="text-sm text-slate-700">{currentPage.helperText[role]}</p>
      )}
    </div>
  );
}
