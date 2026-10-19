import { z } from 'zod';

const baseClientFields = {
  email: z
    .email('No es un email válido.')
    .trim()
    .min(1, 'El email es requerido.')
    .max(100),
  phoneNumber: z.string().trim().min(6, 'No es un teléfono válido.'),
  documentNumber: z
    .string()
    .trim()
    .min(1, 'El documento es requerido.')
    .max(30),
};

const BusinessClientSchema = z.object({
  type: z.literal('business'),
  businessName: z
    .string()
    .trim()
    .min(1, 'La razón social es requerida.')
    .max(150),
  ...baseClientFields,
});

const IndividualClientSchema = z.object({
  type: z.literal('individual'),
  firstName: z.string().trim().min(1, 'El nombre es requerido.').max(100),
  lastName: z.string().trim().min(1, 'El apellido es requerido.').max(100),
  ...baseClientFields,
});

export const CreateClientFormSchema = z.discriminatedUnion('type', [
  BusinessClientSchema,
  IndividualClientSchema,
]);

export type CreateClientFormState = {
  success?: boolean;
  message?: string;
  data?: Record<string, FormDataEntryValue>;
  zodErrors?: Record<string, string[]> | null;
};
