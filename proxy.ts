import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const hasToken = request.cookies.has('access_token');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !hasToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
  ],
};
