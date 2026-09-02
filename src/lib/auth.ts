import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';

export type UserRole = 'ADMIN' | 'OPERATOR' | 'MEMBER';

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
  name: string;
}

export const getCurrentUser = cache(
  async (): Promise<AuthenticatedUser | null> => {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('access_token');

    if (!jwt) return null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${process.env.API_URL}/api/auth/me`, {
        headers: { Cookie: `access_token=${jwt.value}` },
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeout);

      if (!response.ok) return null;

      const authenticatedUser: AuthenticatedUser = await response.json();

      return authenticatedUser;
    } catch (error: unknown) {
      return null;
    }
  }
);
