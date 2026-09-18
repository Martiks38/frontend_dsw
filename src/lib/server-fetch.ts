import 'server-only';

import { cookies } from 'next/headers';

export async function serverFetch<T>(
  path: string,
  timeoutMs = 5000
): Promise<T | null> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('access_token');

  if (!jwt) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${process.env.API_URL}${path}`, {
      headers: { Cookie: `access_token=${jwt.value}` },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!response.ok) return null;

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
