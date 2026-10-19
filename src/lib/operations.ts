import 'server-only';

import { cookies } from 'next/headers';

import type {
  ActiveDeparture,
  BoatSearchResult,
} from '@/interfaces/operations.interface';

export class OperationsError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'OperationsError';
  }
}

const REQUEST_TIMEOUT_MS = 5000;

function fallbackMessage(status: number): string {
  if (status === 401) return 'Tu sesión expiró. Volvé a iniciar sesión.';
  if (status === 403) return 'No tenés permisos para realizar esta acción.';
  if (status === 404) return 'No se encontró el recurso solicitado.';
  if (status === 409)
    return 'La operación entra en conflicto con el estado actual.';
  if (status >= 500) {
    return 'El servidor tuvo un problema. Intentá nuevamente en unos instantes.';
  }
  return 'Ocurrió un error inesperado. Intentá nuevamente.';
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('access_token');
  if (!jwt) throw new OperationsError('Tu sesión expiró.', 401);

  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        Cookie: `access_token=${jwt.value}`,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new OperationsError('Error de conexión. Intentá de nuevo.', 0);
  }

  if (!res.ok) {
    const errorBody: unknown = await res.json().catch(() => null);
    const raw =
      typeof errorBody === 'object' && errorBody !== null
        ? (errorBody as { message?: unknown }).message
        : undefined;

    let message = fallbackMessage(res.status);
    if (Array.isArray(raw)) {
      const joined = raw.filter((m) => typeof m === 'string').join('. ');
      if (joined) message = joined;
    } else if (typeof raw === 'string' && raw.trim()) {
      message = raw;
    }

    throw new OperationsError(message, res.status);
  }

  return (await res.json().catch(() => undefined)) as T;
}

export function findBoats(search: string): Promise<BoatSearchResult[]> {
  return apiRequest<BoatSearchResult[]>(
    `/api/boats/find?search=${encodeURIComponent(search)}`
  );
}

export async function createBoatDeparture(
  publicId: string,
  estimatedReturnDatetime: string
): Promise<void> {
  await apiRequest('/api/boat-departures', {
    method: 'POST',
    body: JSON.stringify({ publicId, estimatedReturnDatetime }),
  });
}

export function listActiveDepartures(): Promise<ActiveDeparture[]> {
  return apiRequest<ActiveDeparture[]>('/api/boat-departures/active');
}

export async function registerBoatReturn(id: number): Promise<void> {
  await apiRequest(`/api/boat-departures/${id}/return`, { method: 'PATCH' });
}
