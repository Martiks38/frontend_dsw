interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Card({ children, ...props }: CardProps) {
  return <div {...props}>{children}</div>;
}
