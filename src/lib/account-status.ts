'use server';

import { cookies } from 'next/headers';

async function patchStatus(path: string, isActive: boolean): Promise<void> {
  const cookieStore = await cookies();

  const jwt = cookieStore.get('access_token');
  if (!jwt) throw new Error('Tu sesión expiró.');

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${jwt.value}`,
      },
      body: JSON.stringify({ isActive }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    throw new Error('Error de conexión. Intentá de nuevo.');
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message ?? 'No pudimos actualizar el estado.');
  }
}

export async function setClientStatus(publicId: string, isActive: boolean) {
  await patchStatus(`/api/clientes/${publicId}/estado`, isActive);
}

export async function setEmployeeStatus(publicId: string, isActive: boolean) {
  await patchStatus(`/api/empleados/${publicId}/estado`, isActive);
}
