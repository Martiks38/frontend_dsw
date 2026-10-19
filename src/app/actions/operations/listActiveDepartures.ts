'use server';

import type { ActiveDeparture, DataActionResult } from '@/interfaces';
import { listActiveDepartures } from '@/lib/operations';

import { runData } from './utils';

export async function listActiveDeparturesAction(): Promise<
  DataActionResult<ActiveDeparture[]>
> {
  return runData(
    listActiveDepartures,
    'No se pudo cargar la lista de embarcaciones en el agua.'
  );
}
