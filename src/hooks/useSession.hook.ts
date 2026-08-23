'use client';

import { useContext } from 'react';

import { SessionContext } from '@/context/session.context';

export const useSession = () => useContext(SessionContext);
