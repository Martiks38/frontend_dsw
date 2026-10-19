'use client';

import { useState } from 'react';

import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog';

interface Props {
  disabled: boolean;
  onCancel: () => void;
}

export function CancelButton({ disabled, onCancel }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="mt-6 flex items-end">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setConfirmOpen(true)}
        className="rounded-md border border-red-500 bg-slate-100 px-4 py-2 text-sm font-semibold text-[#a20505] hover:bg-red-50 disabled:opacity-50"
      >
        Cancelar solicitud
      </button>

      <ConfirmDialog
        open={confirmOpen}
        title="Cancelar solicitud"
        description="¿Confirmás que querés cancelar esta solicitud? Esta acción no se puede deshacer."
        confirmLabel="Sí, cancelar"
        cancelLabel="Volver"
        onConfirm={() => {
          setConfirmOpen(false);
          onCancel();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
