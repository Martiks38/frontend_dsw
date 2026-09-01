interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={className ?? 'flex justify-center'}>{children}</div>;
}
