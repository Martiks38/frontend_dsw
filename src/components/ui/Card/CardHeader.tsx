import React from 'react';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function CardHeader({ children, ...props }: HeaderProps) {
  return <header {...props}>{children}</header>;
}
