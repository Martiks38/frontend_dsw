interface CardContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function CardContent({ children, ...props }: CardContentProps) {
  return <div {...props}>{children}</div>;
}
