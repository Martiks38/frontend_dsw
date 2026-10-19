'use server';

import type { BoatSearchResult, DataActionResult } from '@/interfaces';
import { findBoats } from '@/lib/operations';

import { runData } from '../operations/utils';

export async function findBoatsAction(
  search: string
): Promise<DataActionResult<BoatSearchResult[]>> {
  const term = search.trim();
  if (!term) {
    return { success: false, errorMessage: 'Ingresá un término de búsqueda.' };
  }
  if (term.length > 100) {
    return {
      success: false,
      errorMessage: 'La búsqueda no puede superar los 100 caracteres.',
    };
  }

  return runData(() => findBoats(term), 'No se pudo realizar la búsqueda.');
}
