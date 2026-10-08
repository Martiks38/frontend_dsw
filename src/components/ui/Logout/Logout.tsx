import { LogOut } from 'lucide-react';

import { actions } from '@/app/actions';
import { cn } from '@/lib/cn';

interface LogoutProps extends React.FormHTMLAttributes<HTMLFormElement> {
  iconVisible?: boolean;
}

export function Logout({
  className,
  iconVisible = false,
  ...props
}: LogoutProps) {
  return (
    <form action={actions.auth.logoutUserAction} {...props}>
      <button
        type="submit"
        className={cn(
          'cursor-pointer',
          iconVisible && 'flex grow flex-row flex-nowrap items-center gap-3',
          className
        )}
      >
        {iconVisible && <LogOut aria-hidden="true" />}
        <span>Cerrar sesión</span>
      </button>
    </form>
  );
}
