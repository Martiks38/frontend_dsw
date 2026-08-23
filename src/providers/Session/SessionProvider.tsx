'use client';

import { SessionContext } from '@/context/session.context';
import type { AuthenticatedUser } from '@/lib/auth';

export function SessionProvider({
  user,
  children,
}: {
  user: AuthenticatedUser | null;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
}
