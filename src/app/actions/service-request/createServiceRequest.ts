'use server';

import { cookies } from 'next/headers';

export interface CreateServiceRequestInput {
  boatId: string;
  serviceTypeIds: number[];
  observations?: string;
}

export interface CreateServiceRequestResult {
  success: boolean;
  errorMessage: string | null;
}

export async function createServiceRequest(
  input: CreateServiceRequestInput
): Promise<CreateServiceRequestResult> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('access_token');

  if (!jwt) {
    return {
      success: false,
      errorMessage: 'Iniciá sesión nuevamente.',
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/service-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${jwt.value}`,
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const errorBody = await res.json();

      return {
        success: false,
        errorMessage:
          errorBody?.message ??
          'No pudimos registrar tu solicitud. Intentá de nuevo.',
      };
    }

    return { success: true, errorMessage: null };
  } catch {
    return {
      success: false,
      errorMessage:
        'En este momento no es posible registrar su solicitud. Intente de nuevo más tarde.',
    };
  }
}
