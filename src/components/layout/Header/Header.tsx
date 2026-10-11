'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ButtonLink } from '@/components/ui/Button/ButtonLink';
import { useSession } from '@/hooks/useSession.hook';
import { type UserRole } from '@/lib/auth';
import { cn } from '@/lib/cn';

import headerStyles from './Header.module.css';
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
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="relative mx-auto flex h-full max-w-screen-2xl items-center justify-between px-16">
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

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="menuContainer"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className={cn(
            headerStyles.menu,
            'xmd:hidden',
            isOpen && headerStyles.isOpen
          )}
        />

        <div
          id="menuContainer"
          className={cn(
            'items-center gap-8',
            isOpen
              ? 'xs:w-[20ch] bg-background border-primary xs:h-auto xs:top-[120%] xs:rounded-lg xs:border-x xs:right-8 absolute top-full right-0 z-50 flex h-[calc(75vh)] w-screen flex-col border-2 border-x-0 p-6 shadow-xl'
              : 'xmd:flex hidden'
          )}
        >
          <HeaderNav
            className="xmd:flex-row xmd:text-left w-full flex-col text-center"
            onItemClick={() => setIsOpen(false)}
          />
          <div
            onClick={() => setIsOpen(false)}
            className="xmd:w-auto w-full text-center"
          >
            <ButtonLink href={buttonLink.href}>{buttonLink.label}</ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
