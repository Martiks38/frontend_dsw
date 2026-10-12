'use server';

import { headers } from 'next/headers';

export type FormState = {
  success: boolean;
  message: string;
};

const getTrimmedFormValue = (formData: FormData, field: string) =>
  String(formData.get(field) ?? '').trim();

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fullname = getTrimmedFormValue(formData, 'fullname');
  const email = getTrimmedFormValue(formData, 'email');
  const phone = getTrimmedFormValue(formData, 'phone');
  const subject = getTrimmedFormValue(formData, 'subject');
  const message = getTrimmedFormValue(formData, 'message');

  if (!fullname || !email || !subject || !message) {
    return {
      success: false,
      message: 'Por favor, completa todos los campos obligatorios',
    };
  }

  try {
    const headersNext = await headers();
    const forwardedFor = headersNext.get('x-forwarded-for');

    const response = await fetch(`${process.env.BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(forwardedFor && { 'X-Forwarded-For': forwardedFor }),
      },
      body: JSON.stringify({
        fullname,
        email,
        phone: phone || undefined,
        subject,
        message,
      }),
      cache: 'no-store',
    });

    if (response.ok) {
      return {
        success: true,
        message: '¡Gracias por tu mensaje! Tu consulta fue enviada con éxito.',
      };
    }

    if (response.status === 400) {
      return {
        success: false,
        message: 'Revisá los datos ingresados e intentá nuevamente.',
      };
    }

    if (response.status === 429) {
      return {
        success: false,
        message:
          'Enviaste demasiadas consultas. Esperá un minuto e intentá de nuevo.',
      };
    }

    return {
      success: false,
      message: 'Ocurrió un problema al enviar tu consulta. Intenta nuevamente.',
    };
  } catch {
    return {
      success: false,
      message: 'Error en el servidor. Por favor intenta más tarde.',
    };
  }
}
