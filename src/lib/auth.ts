import 'server-only';

import { cache } from 'react';

import { serverFetch } from './server-fetch';

export type UserRole = 'ADMIN' | 'OPERATOR' | 'MEMBER';

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
  name: string;
}

export const getCurrentUser = cache(
  (): Promise<AuthenticatedUser | null> =>
    serverFetch<AuthenticatedUser>('/api/auth/me')
);
