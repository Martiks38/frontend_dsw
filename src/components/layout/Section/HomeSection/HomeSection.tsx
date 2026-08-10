interface HomeSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading: string;
}

export function HomeSection({
  heading,
  children,
  className,
}: HomeSectionProps) {
  return (
    <section className={`${className ?? ''} mt-12 px-16`} aria-label={heading}>
      <h2 className="text-center text-3xl font-semibold">{heading}</h2>
      {children}
    </section>
  );
}
