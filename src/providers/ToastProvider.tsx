'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Toast from '@/components/ui/Toast/Toast';
import { ToastContext } from '@/context/toast.context';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((newMessage: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    setMessage(newMessage);

    toastTimeoutRef.current = window.setTimeout(() => {
      setMessage(null);
      toastTimeoutRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      const { current } = toastTimeoutRef;

      if (current) {
        window.clearTimeout(current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && <Toast message={message} />}
    </ToastContext.Provider>
  );
}
