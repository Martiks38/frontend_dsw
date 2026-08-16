'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

import { FormState, submitContactForm } from '@/app/actions/contact';

import styles from './contactForm.module.css';

const initialState: FormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={
        'bg-primary text-surface focus-visibile:outline-none focus-visible:ring-primary w-full rounded-md border-2 px-12 py-4 font-medium transition-colors duration-200 hover:bg-[#114062] focus-visible:ring-2 focus-visible:ring-offset-2 active:bg-[#114062] disabled:cursor-not-allowed disabled:opacity-70'
      }
      disabled={pending}
      type="submit"
    >
      {pending ? 'Enviando...' : 'Enviar consulta'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className={styles.contact_form}>
      {state.message && (
        <p
          role="alert"
          className={`${styles.alert} ${state.success ? styles.alert__success : styles.alert__error}`}
        >
          {state.message}
        </p>
      )}
      <div className={styles.form_group}>
        <label htmlFor="fullname">
          Nombre y apellido <span className="text-red-600">(*)</span>
        </label>
        <input
          className="border-slate-200"
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Ej: Juan Pérez"
          autoComplete="name"
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="email">
          Email <span className="text-red-600">(*)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ej: juan@correo.com"
          autoComplete="email"
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+54 341 123 4567"
          autoComplete="tel"
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="subject">
          Asunto <span className="text-red-600">(*)</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="¿En qué podemos ayudarte?"
          required
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="message">
          Mensaje <span className="text-red-600">(*)</span>
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          maxLength={256}
          placeholder="Escribí tu consulta..."
          defaultValue=""
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
