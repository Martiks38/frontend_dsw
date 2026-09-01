import * as cookie from 'cookie';
import { cookies } from 'next/headers';

type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginResponse = {
  user: {
    id: string;
    role: string;
  };
};

export async function loginUserService(
  userData: LoginPayload
): Promise<LoginResponse> {
  const url = `${process.env.API_URL}/api/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? 'Error de autentificación');
  }

  await forwardSetCookies(response);

  return response.json();
}

async function forwardSetCookies(response: Response) {
  const rawCookies = response.headers.getSetCookie();

  if (rawCookies.length === 0) return;

  const cookieStore = await cookies();

  for (const rawCookie of rawCookies) {
    const parsed = cookie.parseSetCookie(rawCookie);

    if (!parsed.value) continue;

    cookieStore.set(parsed.name, parsed.value, {
      httpOnly: parsed.httpOnly ?? false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: parsed.sameSite ?? 'lax',
      path: parsed.path ?? '/',
      maxAge: parsed.maxAge,
    });
  }
}
