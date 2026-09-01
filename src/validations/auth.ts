import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z
    .email('Ingresa un email válido')
    .trim()
    .min(1, 'El email es requerido')
    .max(100, 'El email debe tener como máximo 100 caracteres'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(50, 'La contraseña debe tener como máximo 100 caracteres.'),
  remember: z
    .string()
    .nullish()
    .transform((val) => val === 'on'),
});

export type SignInFormSchema = z.infer<typeof SignInFormSchema>;

export type SignInFormState = {
  success?: boolean;
  message?: string;
  data?: {
    email?: string;
    remember?: boolean;
  };
  zodErrors?: {
    email?: string[];
    password?: string[];
    remember?: string[];
  } | null;
};
