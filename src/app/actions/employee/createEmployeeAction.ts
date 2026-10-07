'use server';

import z from 'zod';

import { createEmployee, EmployeeConflictError } from '@/lib/employees';
import {
  CreateEmployeeFormSchema,
  type CreateEmployeeFormState,
} from '@/validations/employee';

export async function createEmployeeAction(
  _prevState: CreateEmployeeFormState,
  formData: FormData
): Promise<CreateEmployeeFormState> {
  const fields = Object.fromEntries(formData);
  const validatedFields = CreateEmployeeFormSchema.safeParse(fields);

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
    await createEmployee(validatedFields.data);

    return {
      success: true,
      message: 'Empleado creado e invitado por correo.',
      zodErrors: null,
    };
  } catch (error) {
    if (error instanceof EmployeeConflictError) {
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
          : 'No se pudo crear el empleado.',
      zodErrors: null,
      data: fields,
    };
  }
}
