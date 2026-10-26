import { cn } from '@/lib/cn';

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
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonLinkVariants[variant],
        'rounded-md border-2 px-4 py-3 font-medium transition-colors duration-200',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
