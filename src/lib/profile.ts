'use server';

import { cookies } from 'next/headers';

import type { ChangePasswordInput, UpdateProfileInput } from '@/interfaces';
import { ProfileConflictError } from '@/utils/error.util';

async function patchMe(
  path: string,
  body: UpdateProfileInput | ChangePasswordInput
): Promise<void> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('access_token');

  if (!jwt) {
    throw new Error('Tu sesión expiró.');
  }

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/users${path}`, {
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

    if (errorBody?.fieldErrors) {
      throw new ProfileConflictError(
        errorBody.message ?? 'El email y/o el número de documento ya existen.',
        errorBody.fieldErrors
      );
    }

    throw new Error(errorBody?.message ?? 'No pudimos actualizar tus datos.');
  }
}

export async function updateProfile(input: UpdateProfileInput) {
  return patchMe('/me', input);
}

export async function changePassword(input: ChangePasswordInput) {
  return patchMe('/me/password', input);
}
