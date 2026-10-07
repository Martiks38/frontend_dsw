import { z } from 'zod';

export const CreateEmployeeFormSchema = z.object({
  firstName: z.string().trim().min(1, 'El nombre es requerido.').max(100),
  lastName: z.string().trim().min(1, 'El apellido es requerido.').max(100),
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
  employeeNumber: z.string().trim().min(1, 'El legajo es requerido.').max(20),
  employeeType: z.enum(['ADMIN', 'OPERATOR']),
});

export type CreateEmployeeFormState = {
  success?: boolean;
  message?: string;
  data?: Record<string, FormDataEntryValue>;
  zodErrors?: Record<string, string[]> | null;
};
