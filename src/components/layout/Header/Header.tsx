'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button/ButtonLink';
import { useSession } from '@/hooks/useSession.hook';
import { type UserRole } from '@/lib/auth';
import { cn } from '@/lib/cn';

import { HeaderNav } from './HeaderNav';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  srcLogo: string;
  altLogo: string;
  className?: string;
}

const DASHBOARD_LABEL: Record<UserRole, string> = {
  ADMIN: 'Ir al panel',
  OPERATOR: 'Ir al panel',
  MEMBER: 'Mi cuenta',
};

export default function Header({ altLogo, srcLogo, className }: HeaderProps) {
  const { user } = useSession();

  const buttonLink = user
    ? { href: '/dashboard', label: DASHBOARD_LABEL[user.role] }
    : { href: '/iniciar-sesion', label: 'Iniciar sesión' };

  return (
    <header
      className={cn(
        'border-primary bg-background text-primary sticky top-0 z-40 h-(--height-header) w-full border-b-2 font-semibold transition-opacity duration-200',
        className
      )}
    >
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
        <HeaderNav />
        <ButtonLink href={buttonLink.href}>{buttonLink.label}</ButtonLink>
      </div>
    </header>
  );
}
