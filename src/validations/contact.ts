import { z } from 'zod';

export const contactSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(1, 'Ingresá tu nombre y apellido.')
    .max(100, 'Máximo 100 caracteres.'),
  email: z
    .string()
    .trim()
    .min(1, 'Ingresá tu email.')
    .email('Ingresá un email válido.')
    .max(254, 'Máximo 254 caracteres.'),
  phone: z.string().trim().max(30, 'Máximo 30 caracteres.').optional(),
  subject: z
    .string()
    .trim()
    .min(1, 'Ingresá un asunto.')
    .max(150, 'Máximo 150 caracteres.'),
  message: z
    .string()
    .trim()
    .min(1, 'Escribí tu consulta.')
    .max(256, 'Máximo 256 caracteres.'),
});

export type ContactField = keyof z.infer<typeof contactSchema>;
