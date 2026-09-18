export function getDashboardPath(subroute?: string) {
  if (!subroute) return '/dashboard';

  return `/dashboard/${subroute}`;
}
