'use server';

import { cookies } from 'next/headers';

import type { AssignServiceRequestInput } from '@/interfaces';

async function patchServiceRequest(path: string, body: unknown): Promise<void> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('access_token');
  if (!jwt) throw new Error('Tu sesión expiró.');

  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}/api/service-requests${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${jwt.value}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    throw new Error('Error de conexión. Intentá de nuevo.');
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message ?? 'No pudimos guardar los cambios.');
  }
}

export async function updateServiceRequestManagement(
  id: number,
  input: {
    status?: 'IN_PROGRESS' | 'COMPLETED';
    internalComment?: string;
    estimatedReturnDatetime?: string;
  }
) {
  await patchServiceRequest(`/${id}`, input);
}
export async function assignServiceRequest(
  id: number,
  input: AssignServiceRequestInput
) {
  await patchServiceRequest(`/${id}/assign`, input);
}

export async function cancelServiceRequest(id: number, reason?: string) {
  await patchServiceRequest(`/${id}/cancel`, { reason });
}
