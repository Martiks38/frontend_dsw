'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';

interface Props {
  label: string;
  name: string;
  autoComplete: 'current-password' | 'new-password';
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  invalid?: boolean;
}

export function PasswordField({
  label,
  name,
  autoComplete,
  defaultValue,
  maxLength,
  minLength,
  invalid,
}: Props) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={invalid ? 'password-form-error' : undefined}
          className={`w-full rounded-md border p-3 pr-10 text-sm ${
            invalid ? 'border-red-500' : 'border-slate-300'
          }`}
          required
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Ver contraseña'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
        >
          {visible ? (
            <EyeOff className="h-8 w-8" aria-hidden="true" />
          ) : (
            <Eye className="h-8 w-8" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
