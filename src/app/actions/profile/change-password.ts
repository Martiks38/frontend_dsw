'use server';

import z from 'zod';

import { type ChangePasswordInput } from '@/interfaces';
import { changePassword } from '@/lib/profile';
import {
  ChangePasswordFormSchema,
  type ChangePasswordFormState,
} from '@/validations/profile';

export async function changePasswordAction(
  _prevState: ChangePasswordFormState,
  formData: FormData
): Promise<ChangePasswordFormState> {
  const fields = Object.fromEntries(formData);
  const validatedFields = ChangePasswordFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Error de validación',
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        newPassword:
          typeof fields.newPassword === 'string' ? fields.newPassword : '',
        confirmPassword:
          typeof fields.confirmPassword === 'string'
            ? fields.confirmPassword
            : '',
      },
    };
  }

  const input: ChangePasswordInput = {
    currentPassword: validatedFields.data.currentPassword,
    newPassword: validatedFields.data.newPassword,
  };

  try {
    await changePassword(input);

    return {
      success: true,
      message: 'Contraseña actualiza',
      zodErrors: null,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'No se pudo cambiar la contraseña. Intente de nuevo.',
      zodErrors: null,
      data: {
        ...input,
        confirmPassword: validatedFields.data.confirmPassword,
      },
    };
  }
}
