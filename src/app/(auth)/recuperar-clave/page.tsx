import { ForgotPasswordForm } from '@/components/ui/ForgotPasswordForm/ForgotPasswordForm';

export const metadata = { title: 'Recuperar clave | Guardería Náutica' };

export default function ForgotPasswordPage() {
  return (
    <div className="xs:p-6 flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ForgotPasswordForm />
    </div>
  );
}
