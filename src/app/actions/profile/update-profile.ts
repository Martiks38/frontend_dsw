'use server';

import z from 'zod';

import { updateProfile } from '@/lib/profile';
import { ProfileConflictError } from '@/utils/error.util';
import {
  ProfileFormSchema,
  type ProfileFormState,
} from '@/validations/profile';

export async function updateProfileAction(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const fields = Object.fromEntries(formData);
  const { type: _type, ...data } = fields;

  const validatedFields = ProfileFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Error de validación',
      zodErrors: flattenedErrors.fieldErrors,
      data,
    };
  }

  try {
    const { type: _validatedType, ...input } = validatedFields.data;

    await updateProfile(input);

    return {
      success: true,
      message: 'Sus datos han sido actualizados.',
      zodErrors: null,
      data: input,
    };
  } catch (error) {
    if (error instanceof ProfileConflictError) {
      return {
        success: false,
        message: error.message,
        zodErrors: error.fieldErrors,
        data,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'No se pudo actualizar tus datos. Intente de nuevo.',
      zodErrors: null,
      data,
    };
  }
}
