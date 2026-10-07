'use server';

import z from 'zod';

import { BoatConflictError, createBoat } from '@/lib/boats';
import {
  CreateBoatFormSchema,
  type CreateBoatFormState,
} from '@/validations/boat';

export async function createBoatAction(
  _prevState: CreateBoatFormState,
  formData: FormData
): Promise<CreateBoatFormState> {
  const fields = Object.fromEntries(formData);
  const validatedFields = CreateBoatFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Error de validación',
      zodErrors: flattenedErrors.fieldErrors,
      data: fields,
    };
  }

  try {
    await createBoat(validatedFields.data);

    return {
      success: true,
      message: 'Embarcación registrada correctamente.',
      zodErrors: null,
    };
  } catch (error) {
    if (error instanceof BoatConflictError) {
      return {
        success: false,
        message: error.message,
        zodErrors: error.fieldErrors,
        data: fields,
      };
    }
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'No se pudo registrar la embarcación.',
      zodErrors: null,
      data: fields,
    };
  }
}
