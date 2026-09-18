import { memo } from 'react';

import { SEQUENCE } from './consts';

interface Props {
  fn: {
    goBack: () => void;
    goNext: () => void;
    handleConfirm: () => void;
  };
  stepIndex: number;
  currentStep: string;
  isPending: boolean;
  selectedServiceIds: number[];
}

export const ProgressiveButtonsPanel = memo(function ProgressiveButtonsPanel({
  fn,
  stepIndex,
  currentStep,
  selectedServiceIds,
  isPending,
}: Props) {
  return (
    <div className="mt-6 flex justify-between">
      <button
        type="button"
        onClick={fn.goBack}
        disabled={stepIndex === 0 || isPending}
        className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-0"
      >
        Atrás
      </button>
      {stepIndex < SEQUENCE.length - 1 ? (
        <button
          type="button"
          onClick={fn.goNext}
          disabled={
            currentStep === 'service' && selectedServiceIds.length === 0
          }
          className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Continuar
        </button>
      ) : (
        <button
          type="button"
          onClick={fn.handleConfirm}
          disabled={isPending}
          className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? 'Enviando...' : 'Confirmar solicitud'}
        </button>
      )}
    </div>
  );
});
