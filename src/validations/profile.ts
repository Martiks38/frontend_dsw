import { z } from 'zod';

const baseProfileFields = {
  email: z
    .email('No es un email válido.')
    .trim()
    .min(1, 'El email es requerido.')
    .max(100, 'El email no puede superar los 100 caracteres.'),
  phoneNumber: z
    .string()
    .trim()
    .min(7, 'No es un teléfono válido.')
    .max(20, 'El número de teléfono no puede superar los 20'),
  documentNumber: z
    .string()
    .trim()
    .min(1, 'El documento es requerido.')
    .max(30, 'El documento no puede superar los 30 caracteres.'),
};

const BusinessProfileFormSchema = z.object({
  type: z.literal('business'),
  businessName: z
    .string()
    .trim()
    .min(1, 'La razón social es requerida.')
    .max(100, 'La razón social no puede superar los 100 caracteres.'),
  ...baseProfileFields,
});

const IndividualProfileFormSchema = z.object({
  type: z.literal('individual'),
  firstName: z
    .string()
    .trim()
    .min(1, 'El nombre es requerido.')
    .max(100, 'El nombre no puede superar los 100 caracteres.'),
  lastName: z
    .string()
    .trim()
    .min(1, 'El apellido es requerido.')
    .max(100, 'El nombre no puede superar los 100 caracteres.'),
  ...baseProfileFields,
});

export const ProfileFormSchema = z.discriminatedUnion('type', [
  BusinessProfileFormSchema,
  IndividualProfileFormSchema,
]);

export type ProfileFormSchema = z.infer<typeof ProfileFormSchema>;

export type ProfileFormState = {
  success?: boolean;
  message?: string;
  data?: {
    firstName?: string;
    lastName?: string;
    businessName?: string;
    email?: string;
    phoneNumber?: string;
    documentNumber?: string;
  };
  zodErrors?: {
    firstName?: string[];
    lastName?: string[];
    businessName?: string[];
    email?: string[];
    phoneNumber?: string[];
    documentNumber?: string[];
  } | null;
};

export const ChangePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida.'),
    newPassword: z
      .string()
      .min(8, 'La nueva contraseña no puede tener menos de 6 caracteres.')
      .max(50, 'La nueva contraseña no puede superar los 50 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirma la contraseña.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: 'La confirmación no coincide con la nueva contraseña.',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormSchema = z.infer<typeof ChangePasswordFormSchema>;

export type ChangePasswordFormState = {
  success?: boolean;
  message?: string;
  data?: {
    newPassword?: string;
    confirmPassword?: string;
  };
  zodErrors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  } | null;
};
