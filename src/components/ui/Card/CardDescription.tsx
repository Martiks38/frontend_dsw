interface CardDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function CardDescription({ children, ...props }: CardDescriptionProps) {
  return <p {...props}>{children}</p>;
}
