import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z
    .email('No es un email válido.')
    .trim()
    .min(1, 'El email es requerido.')
    .max(100, 'El email debe tener como máximo 100 caracteres.'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(50, 'La contraseña debe tener como máximo 50 caracteres.'),
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

export const ResetPasswordFormSchema = z
  .object({
    token: z.string().min(1, 'El enlace es inválido. Solicitá uno nuevo.'),
    newPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .max(50, 'La contraseña debe tener como máximo 50 caracteres.')
      .regex(/[A-Za-z]/, 'La contraseña debe incluir al menos una letra.')
      .regex(/\d/, 'La contraseña debe incluir al menos un número.'),
    confirmPassword: z.string().min(1, 'Repetí la contraseña.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden.',
  });

export type ResetPasswordFormSchema = z.infer<typeof ResetPasswordFormSchema>;

export type ResetPasswordFormState = {
  success?: boolean;
  message?: string;
  zodErrors?: {
    token?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  } | null;
};
