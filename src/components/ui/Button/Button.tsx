import Link from 'next/link';

type ButtonLinkVariants = 'primary' | 'secondary';

interface ButtonLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonLinkVariants;
}

const buttonLinkVariants: Record<ButtonLinkVariants, string> = {
  primary: 'bg-primary text-surface',
  secondary: 'bg-surface text-primary',
};

export default function ButtonLink({
  href,
  children,
  className,
  variant = 'primary',
}: ButtonLinkProps) {
  const variantStyles = buttonLinkVariants[variant];

  return (
    <Link
      className={`${variantStyles} ${className ?? ''} rounded-md border-2 px-2 py-1.5`}
      href={href}
    >
      {children}
    </Link>
  );
}
