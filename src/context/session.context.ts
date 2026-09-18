'use client';

import { createContext } from 'react';

import type { AuthenticatedUser } from '@/lib/auth';

interface SessionContextType {
  user: AuthenticatedUser | null;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);
