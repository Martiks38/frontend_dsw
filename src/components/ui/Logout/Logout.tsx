import { LogOut } from 'lucide-react';

import { actions } from '@/app/actions';
import { cn } from '@/lib/cn';

interface LogoutProps extends React.FormHTMLAttributes<HTMLFormElement> {
  iconVisible?: boolean;
  labelVisible?: boolean;
}

export function Logout({
  className,
  iconVisible = false,
  labelVisible = true,
  ...props
}: LogoutProps) {
  return (
    <form action={actions.auth.logoutUserAction} {...props}>
      <button
        type="submit"
        title={labelVisible ? undefined : 'Cerrar sesión'}
        className={cn(
          'cursor-pointer',
          iconVisible && 'flex grow flex-row flex-nowrap items-center gap-3',
          iconVisible && !labelVisible && 'w-full justify-center',
          className
        )}
      >
        {iconVisible && <LogOut aria-hidden="true" />}
        {/* sr-only (no display:none) conserva el nombre accesible del botón */}
        <span className={cn(!labelVisible && 'sr-only')}>Cerrar sesión</span>
      </button>
    </form>
  );
}
