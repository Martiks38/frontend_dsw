import Link from 'next/link';

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
  const variantStyles = buttonLinkVariants[variant];

  return (
    <Link
      className={`${variantStyles} ${className ?? ''} focus-visibile:outline-none focus-visible:ring-primary rounded-md border-2 px-2 py-1.5 font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2`}
      href={href}
    >
      {children}
    </Link>
  );
}
