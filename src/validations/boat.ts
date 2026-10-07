import { z } from 'zod';

export const CreateBoatFormSchema = z
  .object({
    name: z.string().trim().min(1, 'El nombre es requerido.').max(100),
    model: z.string().trim().min(1, 'El modelo es requerido.').max(100),
    registrationNumber: z
      .string()
      .trim()
      .min(1, 'La matrícula es requerida.')
      .max(30),
    description: z
      .string()
      .trim()
      .min(1, 'La descripción es requerida.')
      .max(500),
    boatTypeId: z.string().min(1, 'Seleccioná un tipo de embarcación.'),
    ownerPublicId: z.string().min(1, 'Seleccioná un cliente.'),
    cradleId: z.string().min(1, 'Seleccioná una cuna.'),
    startDatetime: z.string().min(1, 'La fecha de ingreso es requerida.'),
    plannedEndDate: z.string().optional(),
  })
  .refine(
    ({ startDatetime, plannedEndDate }) => {
      if (!plannedEndDate) return true;
      return new Date(plannedEndDate) >= new Date(startDatetime);
    },
    {
      path: ['plannedEndDate'],
      message: 'La fecha prevista de salida no puede ser anterior al ingreso.',
    }
  );

export type CreateBoatFormState = {
  success?: boolean;
  message?: string;
  data?: Record<string, FormDataEntryValue>;
  zodErrors?: Record<string, string[]> | null;
};
