export type ButtonLinkVariants = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonLinkVariants;
}

export const buttonLinkVariants: Record<ButtonLinkVariants, string> = {
  primary: 'bg-primary text-surface hover:bg-[#114062] active:bg-[#114062]',
  secondary: 'bg-surface text-primary hover:bg-[#f0f5fa] active:bg-[#dbe7f0]',
};

export function Button({
  children,
  className,
  variant = 'primary',
}: ButtonProps) {
  const variantStyles = buttonLinkVariants[variant];

  return (
    <button
      className={`${variantStyles} ${className ?? ''} focus-visible:ring-primary rounded-md border-2 px-2 py-1.5 font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none`}
    >
      {children}
    </button>
  );
}
