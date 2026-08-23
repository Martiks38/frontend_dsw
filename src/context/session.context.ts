'use client';

import { createContext } from 'react';

import type { AuthenticatedUser } from '@/lib/auth';

export const SessionContext = createContext<AuthenticatedUser | null>(null);
