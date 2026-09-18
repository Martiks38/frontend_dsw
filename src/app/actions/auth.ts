'use server';

import { redirect } from 'next/navigation';
import z from 'zod';

import { SIGN_IN_FIELDS } from '@/components/layout/SignInForm/constants';
import { loginUserService } from '@/lib/login';
import { SignInFormSchema, type SignInFormState } from '@/validations/auth';

export async function loginUserAction(
  prevState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  const fields = {
    email: formData.get(SIGN_IN_FIELDS.email),
    password: formData.get(SIGN_IN_FIELDS.password),
    remember: formData.get(SIGN_IN_FIELDS.remember),
  };

  const validatedFields = SignInFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Error de validación',
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        email: typeof fields.email === 'string' ? fields.email : '',
      },
    };
  }

  try {
    await loginUserService(validatedFields.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: 'No se puedo iniciar sesión',
      zodErrors: null,
      data: { email: validatedFields.data.email },
    };
  }

  redirect('/');
}
