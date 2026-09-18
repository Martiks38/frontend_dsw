export type StepKey = 'boat' | 'service' | 'confirm';

export const SEQUENCE = ['boat', 'service', 'confirm'] as const;

export const STEP_LABELS: Record<StepKey, string> = {
  boat: 'Embarcación',
  service: 'Elegir servicios',
  confirm: 'Confirmar',
};
