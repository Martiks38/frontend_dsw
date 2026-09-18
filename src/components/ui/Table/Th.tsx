import { cn } from '@/lib/cn';

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function Th({ children, className, ...props }: ThProps) {
  return (
    <th {...props} className={cn('py-2 pr-4 font-medium', className)}>
      {children}
    </th>
  );
}
