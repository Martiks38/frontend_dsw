import { type Metadata } from 'next';

import SignInForm from '@/components/layout/SignInForm/SignInForm';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description:
    'Accedé a tu cuenta para gestionar tus embarcaciones y servicios.',
};

export default function SignInRoute() {
  return (
    <div className="xs:p-6 flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <SignInForm />
    </div>
  );
}
