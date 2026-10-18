'use server';

import { headers } from 'next/headers';
import z from 'zod';

import { type ContactField, ContactSchema } from '@/validations/contact';

export type FormState = {
  success: boolean;
  message: string;
  zodErrors?: Partial<Record<ContactField, string[]>>;
  data?: Record<ContactField, string>;
};

const getTrimmedFormValue = (formData: FormData, field: ContactField) =>
  String(formData.get(field) ?? '').trim();

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data: Record<ContactField, string> = {
    fullname: getTrimmedFormValue(formData, 'fullname'),
    email: getTrimmedFormValue(formData, 'email'),
    phone: getTrimmedFormValue(formData, 'phone'),
    subject: getTrimmedFormValue(formData, 'subject'),
    message: getTrimmedFormValue(formData, 'message'),
  };

  const validatedFields = ContactSchema.safeParse({
    ...data,
    phone: data.phone || undefined,
  });

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Revisá los campos marcados e intentá nuevamente.',
      zodErrors: flattenedErrors.fieldErrors,
      data,
    };
  }

  try {
    const forwardedFor = (await headers()).get('x-forwarded-for');

    const response = await fetch(`${process.env.BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(forwardedFor && { 'X-Forwarded-For': forwardedFor }),
      },
      body: JSON.stringify(validatedFields.data),
      cache: 'no-store',
    });

    if (response.ok) {
      return {
        success: true,
        message: '¡Gracias por tu mensaje! Tu consulta fue enviada con éxito.',
      };
    }

    if (response.status === 429) {
      return {
        success: false,
        message:
          'Enviaste demasiadas consultas. Esperá un minuto e intentá de nuevo.',
        data,
      };
    }

    return {
      success: false,
      message: 'Ocurrió un problema al enviar tu consulta. Intenta nuevamente.',
      data,
    };
  } catch {
    return {
      success: false,
      message: 'Error en el servidor. Por favor intenta más tarde.',
      data,
    };
  }
}
