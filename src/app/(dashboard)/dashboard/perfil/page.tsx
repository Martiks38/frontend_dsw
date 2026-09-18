import { redirect } from 'next/navigation';

import { EditableProfileForm } from '@/components/profile/EditableProfile';
import { OperatorProfileView } from '@/components/profile/OperatorProfileView';
import type { Profile } from '@/interfaces';
import { getCurrentUser } from '@/lib/auth';
import { serverFetch } from '@/lib/server-fetch';

export const metadata = { title: 'Mi perfil | Guardería Náutica' };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/iniciar-sesion');

  const profile = await serverFetch<Profile>('/api/users/me');
  if (!profile) redirect('/iniciar-sesion');

  if (profile.type === 'employee') {
    return <OperatorProfileView profile={profile} />;
  }

  return <EditableProfileForm profile={profile} />;
}
