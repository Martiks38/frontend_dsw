import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/cn';

export function PasswordInput(
  props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
) {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordIcon = showPassword ? EyeOff : Eye;
  const passwordLabel = showPassword
    ? 'Ocultar contraseña'
    : 'Mostrar contraseña';

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
        aria-label={passwordLabel}
        className={cn(
          'absolute top-1/2 right-2 -translate-y-1/2 rounded-[50%] border-2 border-transparent p-0.5',
          'hover:border-primary focus-visible:border-primary focus-visible:outline-primary focus-visible:outline-2'
        )}
      >
        <PasswordIcon aria-hidden="true" />
      </button>
    </div>
  );
}
