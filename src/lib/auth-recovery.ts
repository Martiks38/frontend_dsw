'use server';

async function postAuth(path: string, body: unknown): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}/api/auth${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    throw new Error('Error de conexión. Intentá de nuevo.');
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message ?? 'Ocurrió un error.');
  }
}

export async function forgotPassword(email: string): Promise<void> {
  await postAuth('/forgot-password', { email });
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  await postAuth('/reset-password', { token, newPassword });
}
