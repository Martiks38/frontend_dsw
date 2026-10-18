'use client';

import { usePathname } from 'next/navigation';

import { DASHBOARD_PAGE_TITLE } from '@/data';
import { type UserRole } from '@/lib/auth';

export function PageTitle({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const accessiblePages = DASHBOARD_PAGE_TITLE.filter((item) =>
    item.roles.includes(role)
  );

  const currentPage =
    accessiblePages.find((item) => item.href === pathname) ??
    accessiblePages
      .filter((item) => pathname.startsWith(`${item.href}/`))
      .sort((a, b) => b.href.length - a.href.length)[0];

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
