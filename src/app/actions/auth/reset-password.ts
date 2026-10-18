'use server';

import { z } from 'zod';

import { resetPassword } from '@/lib/auth-recovery';
import {
  ResetPasswordFormSchema,
  type ResetPasswordFormState,
} from '@/validations/auth';

const GENERIC_ERROR = 'No se pudo cambiar la contraseña. Intentá nuevamente.';

export async function resetPasswordAction(
  _prevState: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> {
  const parsed = ResetPasswordFormSchema.safeParse({
    token: formData.get('token'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!parsed.success) {
    return {
      success: false,
      zodErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await resetPassword(parsed.data.token, parsed.data.newPassword);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : GENERIC_ERROR,
    };
  }
}
