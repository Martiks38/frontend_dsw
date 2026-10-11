import { cn } from '@/lib/cn';

interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading: string;
}

export function PageSection({
  heading,
  children,
  className,
}: PageSectionProps) {
  return (
    <section
      className={cn(className, 'px-10 pt-10 md:px-16 md:pt-16')}
      aria-label={heading}
    >
      <h2 className="pb-8 text-center text-3xl font-semibold md:pb-12">
        {heading}
      </h2>
      {children}
    </section>
  );
}
