'use client';

import { useContext } from 'react';

import { SessionContext } from '@/context/session.context';

export const useSession = () => {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    throw new Error('useSession debe usarse dentro de su respectivo provider');
  }

  return ctx;
};
