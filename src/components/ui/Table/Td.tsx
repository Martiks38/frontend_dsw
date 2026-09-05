interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function Td({ children, className, ...props }: TdProps) {
  return (
    <td className={`py-2 pr-4 ${className ?? ''}`} {...props}>
      {children}
    </td>
  );
}
