import { useState } from 'react';

import { cn } from '@/lib/cn';
import type { PasswordIconName } from '@/types';

import Icon from '../Icon/Icon';

export function PasswordInput(
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
) {
  const [showPassword, setShowPassword] = useState(false);

  const icon: { id: PasswordIconName; label: string } = showPassword
    ? { id: 'eye-slash', label: 'Ocultar contraseña' }
    : { id: 'eye', label: 'Mostrar contraseña' };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'w-full rounded-lg border border-(--primary-color-40) px-3 py-2 pr-10',
          'focus-visible:outline-primary focus-visible:outline-2'
        )}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-pressed={showPassword}
        aria-controls={props.id}
        aria-label={icon.label}
        className={cn(
          'absolute top-1/2 right-2 -translate-y-1/2 rounded-[50%] border-2 border-transparent p-0.5',
          'hover:border-primary focus-visible:border-primary focus-visible:outline-primary focus-visible:outline-2'
        )}
      >
        <Icon id={icon.id} title={icon.label} />
      </button>
    </div>
  );
}
