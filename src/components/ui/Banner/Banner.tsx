import { cn } from '@/lib/cn';

import { type ButtonLinkVariants } from '../Button/Button';
import { ButtonLink } from '../Button/ButtonLink';

export interface BannerButton {
  href: string;
  text: string;
  variant: ButtonLinkVariants;
}

interface BannerProps {
  heading: string;
  text: string;
  button: BannerButton;
  rounded?: number;
  className?: string;
}

export default function Banner({
  button,
  className,
  text,
  heading,
  rounded = 1.25,
}: BannerProps) {
  return (
    <section
      role="banner"
      className={cn(
        `bg-primary text-surface border-b-2 text-center md:text-left rounded-[${rounded}rem] mt-12 grid grid-cols-[1fr_auto] items-center gap-y-4 px-16 py-12 md:gap-x-8`,
        'grid [grid-template-areas:"title""text""action"] md:[grid-template-areas:"title_action""text_action"]',
        className
      )}
      aria-label={heading}
    >
      <h2 className="text-xl font-semibold [grid-area:title] md:text-3xl">
        {heading}
      </h2>
      <p className="mb-6 [grid-area:text] md:mb-0">{text}</p>
      <ButtonLink
        href={button.href}
        variant={button.variant}
        className="text-semibold mx-auto w-fit text-center text-[1.25rem] [grid-area:action] md:mx-0 md:text-left md:text-2xl"
      >
        {button.text}
      </ButtonLink>
    </section>
  );
}
