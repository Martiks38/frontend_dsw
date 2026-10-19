'use server';

import { type ActionResult } from '@/interfaces';
import { createBoatDeparture, registerBoatReturn } from '@/lib/operations';

import { runVoid } from './utils';

export async function createDepartureAction(
  publicId: string,
  estimatedReturnDatetime: string
): Promise<ActionResult> {
  if (!publicId) {
    return {
      success: false,
      errorMessage: 'Falta el identificador de la embarcación.',
    };
  }
  if (Number.isNaN(new Date(estimatedReturnDatetime).getTime())) {
    return {
      success: false,
      errorMessage: 'La fecha estimada de regreso no es válida.',
    };
  }

  return runVoid(
    () => createBoatDeparture(publicId, estimatedReturnDatetime),
    'No se pudo registrar la salida.'
  );
}

export async function registerReturnAction(id: number): Promise<ActionResult> {
  if (!Number.isInteger(id) || id <= 0) {
    return {
      success: false,
      errorMessage: 'Identificador de salida inválido.',
    };
  }

  return runVoid(
    () => registerBoatReturn(id),
    'No se pudo registrar el retorno.'
  );
}
