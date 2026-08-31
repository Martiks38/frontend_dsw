import { z } from 'zod';

export const SignInFormSchema = z.object({
  identifier: z.string().min(3, 'Email debe tener al menos 3 caracteres'),
  password: z
    .string()
    .min(6, 'Password debe tener al menos 6 caracteres')
    .max(50, 'Contraseña debe tener como máximo 100 caracteres.'),
});

export type SignInFormSchema = z.infer<typeof SignInFormSchema>;

export type FormState = {
  sucess?: boolean;
  message?: string;
  data?: {
    identifier?: string;
    username?: string;
    email?: string;
    password?: string;
  };
  apiErrors?: string | null;
  zodErrors?: {
    identifier?: string[];
    email?: string[];
    password?: string[];
  } | null;
};
