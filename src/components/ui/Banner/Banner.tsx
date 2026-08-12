import ButtonLink, { type ButtonLinkVariants } from '../Button/Button';
import styles from './banner.module.css';

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
      className={`${styles.banner} bg-primary text-surface mt-12 grid grid-cols-[1fr_auto] items-center gap-[0.5rem_2rem] px-16 py-12 rounded-[${rounded}rem] ${className ?? ''}`}
      aria-label={heading}
    >
      <h2 className="text-center text-3xl font-semibold">{heading}</h2>
      <p>{text}</p>
      <ButtonLink
        href={button.href}
        variant={button.variant}
        className="text-semibold text-2xl"
      >
        {button.text}
      </ButtonLink>
    </section>
  );
}
