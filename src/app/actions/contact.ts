'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success: boolean;
  message: string;
};

const getTrimmedFormValue = (formData: FormData, field: string) => {
  return (formData.get(field) as string)?.trim();
};

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Por favor, ingresa un correo electrónico válido.',
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Contacto Web <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL_RECIPIENT || 'test@test.com'],
      replyTo: email,
      subject: `Nueva consulta: ${subject}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre y Apellido:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <h3>Mensaje:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) {
      return {
        success: false,
        message: 'Ocurrió un problema al enviar el correo. Intenta nuevamente.',
      };
    }

    return {
      success: true,
      message: '¡Gracias por tu mensaje! Tu consulta fue enviada con éxito.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: 'Error en el servidor. Por favor intenta más tarde.',
    };
  }
}
