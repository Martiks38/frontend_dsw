import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button/ButtonLink';
import { NAVIGATION_ITEMS } from '@/data';
import { getCurrentUser, type UserRole } from '@/lib/auth';

import styles from './Header.module.css';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  srcLogo: string;
  altLogo: string;
}

const DASHBOARD_LABEL: Record<UserRole, string> = {
  ADMIN: 'Ir al panel',
  OPERATOR: 'Ir al panel',
  MEMBER: 'Mi cuenta',
};

export default async function Header({ altLogo, srcLogo }: HeaderProps) {
  const user = await getCurrentUser();
  const buttonLink = user
    ? { href: '/dashboard', label: DASHBOARD_LABEL[user.role] }
    : { href: '/signin', label: 'Iniciar sesión' };

  return (
    <header className="border-primary bg-background text-primary fixed top-0 left-0 z-40 h-(--height-header) w-full border-b-2 font-semibold">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-16">
        <Link href={'/'}>
          <Image
            src={srcLogo}
            width={150}
            height={32}
            alt={altLogo}
            className="h-8 w-auto"
            preload
          />
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex justify-between gap-x-1">
            {NAVIGATION_ITEMS.map(({ href, label }) => {
              return (
                <li key={label}>
                  <Link className={`px-2 py-1 ${styles.link}`} href={href}>
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ButtonLink href={buttonLink.href}>{buttonLink.label}</ButtonLink>
      </div>
    </header>
  );
}
