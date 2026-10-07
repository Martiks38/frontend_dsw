'use server';

import z from 'zod';

import { ClientConflictError, createClient } from '@/lib/clients';
import {
  CreateClientFormSchema,
  type CreateClientFormState,
} from '@/validations/client';

export async function createClientAction(
  _prevState: CreateClientFormState,
  formData: FormData
): Promise<CreateClientFormState> {
  const fields = Object.fromEntries(formData);
  const { type: _type, ...data } = fields;

  const validatedFields = CreateClientFormSchema.safeParse(fields);

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
    await createClient(validatedFields.data);
    return {
      success: true,
      message: 'Cliente creado e invitado por correo.',
      zodErrors: null,
    };
  } catch (error) {
    if (error instanceof ClientConflictError) {
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
        error instanceof Error ? error.message : 'No se pudo crear el cliente.',
      zodErrors: null,
      data,
    };
  }
}
