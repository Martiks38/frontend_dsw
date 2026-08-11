export interface ContractProcessStep {
  step: number;
  description: string;
}

export const CONTRACT_PROCESS: ContractProcessStep[] = [
  {
    step: 1,
    description: 'Consulta disponibilidad',
  },
  {
    step: 2,
    description: 'Registramos tu embarcación',
  },
  {
    step: 3,
    description: 'Coordinamos el ingreso',
  },
  {
    step: 4,
    description: 'Guardamos y cuidamos',
  },
  {
    step: 5,
    description: 'Solicitás el retiro cuando quieras',
  },
];
