export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={className ?? 'text-2xl font-semibold'}>{children}</h1>;
}
