import Link from 'next/link';

type ButtonLinkVariants = 'primary' | 'secondary';

interface ButtonLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonLinkVariants;
}

const buttonLinkVariants: Record<ButtonLinkVariants, string> = {
  primary: 'bg-primary text-surface hover:bg-[#114062] active:bg-[#114062]',
  secondary: 'bg-surface text-primary hover:bg-[#f0f5fa] active:bg-[#dbe7f0]',
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
      className={`${variantStyles} ${className ?? ''} focus-visibile:outline-none focus-visible:ring-primary rounded-md border-2 px-2 py-1.5 font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2`}
      href={href}
    >
      {children}
    </Link>
  );
}
