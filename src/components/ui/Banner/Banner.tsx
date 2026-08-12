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
  className?: string;
}

export default function Banner({
  button,
  className,
  text,
  heading,
}: BannerProps) {
  return (
    <section
      className={`${className ?? ''} ${styles.banner} mt-12`}
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
