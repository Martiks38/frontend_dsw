import { cn } from '@/lib/cn';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'rounded-lg border border-(--primary-color-40) px-3 py-2',
        'focus-visible:outline-primary focus-visible:outline-2'
      )}
      {...props}
    />
  );
}
