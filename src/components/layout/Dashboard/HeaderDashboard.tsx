import { type UserRole } from '@/lib/auth';

import { PageTitle } from './PageTitle';
import { UserMenu } from './UserMenu';

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  OPERATOR: 'Operador',
  MEMBER: 'Socio',
};

export function HeaderDashboard({
  userName,
  role,
}: {
  userName: string;
  role: UserRole;
}) {
  return (
    <header
      role="banner"
      className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4"
    >
      <PageTitle role={role} />
      <UserMenu userName={userName} roleLabel={ROLE_LABELS[role]} />
    </header>
  );
}
