import Link from 'next/link';

import { cn } from '@/lib/cn';

import { type ButtonLinkVariants, buttonLinkVariants } from './Button';

interface ButtonLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonLinkVariants;
}

export function ButtonLink({
  href,
  children,
  className,
  variant = 'primary',
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-block rounded-md border-2 px-2 py-1.5 font-medium transition-colors duration-200',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
        buttonLinkVariants[variant]
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
