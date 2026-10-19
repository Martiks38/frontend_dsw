'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

import { type FormState, submitContactForm } from '@/app/actions/contact';
import { cn } from '@/lib/cn';
import { type ContactField } from '@/validations/contact';

import styles from './contactForm.module.css';

const initialState: FormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        'bg-primary text-surface w-full rounded-md border-2 px-12 py-4 font-medium transition-colors duration-200',
        'focus-visible:ring-primary hover:bg-[#114062] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:bg-[#114062] disabled:cursor-not-allowed disabled:opacity-70'
      )}
      disabled={pending}
      type="submit"
    >
      {pending ? 'Enviando...' : 'Enviar consulta'}
    </button>
  );
}

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) return null;

  return (
    <p id={id} className="mt-1 text-sm text-red-600">
      {messages[0]}
    </p>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.zodErrors;

  const fieldProps = (name: ContactField) => ({
    defaultValue: state.data?.[name],
    'aria-invalid': errors?.[name] ? true : undefined,
    'aria-describedby': errors?.[name] ? `${name}-error` : undefined,
  });

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  useEffect(() => {
    if (errors) {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    }
  }, [errors]);

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className={cn(styles.contact_form, className)}
    >
      {state.message && (
        <p
          role="alert"
          className={cn(styles.alert, {
            [styles.alert__success]: state.success,
            [styles.alert__error]: !state.success,
          })}
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
          {...fieldProps('fullname')}
        />
        <FieldError id="fullname-error" messages={errors?.fullname} />
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
          {...fieldProps('email')}
        />
        <FieldError id="email-error" messages={errors?.email} />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+54 341 123 4567"
          autoComplete="tel"
          {...fieldProps('phone')}
        />
        <FieldError id="phone-error" messages={errors?.phone} />
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
          {...fieldProps('subject')}
        />
        <FieldError id="subject-error" messages={errors?.subject} />
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
          required
          {...fieldProps('message')}
        />
        <FieldError id="message-error" messages={errors?.message} />
      </div>
      <SubmitButton />
    </form>
  );
}
