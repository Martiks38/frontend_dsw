'use server';

import { cookies } from 'next/headers';

export class BoatConflictError extends Error {
  constructor(
    message: string,
    public readonly fieldErrors: Record<string, string[]>
  ) {
    super(message);
    this.name = 'BoatConflictError';
  }
}

export async function createBoat(
  input: Record<string, unknown>
): Promise<void> {
  const cookieStore = await cookies();

  const jwt = cookieStore.get('access_token');
  if (!jwt) throw new Error('Tu sesión expiró.');

  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}/api/boats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${jwt.value}`,
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    throw new Error('Error de conexión. Intentá de nuevo.');
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    if (errorBody?.fieldErrors) {
      throw new BoatConflictError(
        errorBody.message ?? 'Algunos datos ya están registrados.',
        errorBody.fieldErrors
      );
    }
    throw new Error(errorBody?.message ?? 'No pudimos crear la embarcación.');
  }
}
