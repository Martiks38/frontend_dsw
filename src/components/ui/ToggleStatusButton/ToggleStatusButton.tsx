'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog';

interface Props {
  isActive: boolean;
  entityLabel: string;
  onToggle: (nextActive: boolean) => Promise<void>;
}

export function ToggleStatusButton({ isActive, entityLabel, onToggle }: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runToggle(nextActive: boolean) {
    startTransition(async () => {
      try {
        await onToggle(nextActive);

        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Ocurrió un error.');
      }
    });
  }

  return (
    <>
      <button
        type="button"
        disabled={isPending}
        onClick={() => (isActive ? setConfirmOpen(true) : runToggle(true))}
        className={`rounded-md px-2.5 py-1 text-xs font-medium ${
          isActive
            ? 'text-red-600 hover:bg-red-50'
            : 'text-emerald-600 hover:bg-emerald-50'
        } disabled:opacity-50`}
      >
        {isActive ? 'Desactivar' : 'Activar'}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}

      <ConfirmDialog
        open={confirmOpen}
        title="Desactivar cuenta"
        description={`¿Confirmás que querés desactivar ${entityLabel}? Va a perder acceso al sistema.`}
        confirmLabel="Sí, desactivar"
        cancelLabel="Volver"
        onConfirm={() => {
          setConfirmOpen(false);
          runToggle(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
