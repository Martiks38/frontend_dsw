interface HomeSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading: string;
}

export function HomeSection({
  heading,
  children,
  className,
}: HomeSectionProps) {
  return (
    <section className={`${className ?? ''} px-16 pt-16`} aria-label={heading}>
      <h2 className="pb-12 text-center text-3xl font-semibold">{heading}</h2>
      {children}
    </section>
  );
}
