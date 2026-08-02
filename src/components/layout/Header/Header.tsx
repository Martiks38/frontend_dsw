import Image from 'next/image';
import Link from 'next/link';

import ButtonLink from '@/components/ui/Button/Button';
import { navigationItems } from '@/data';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className="h-14 px-8 flex justify-between items-center bg-background] text-primary font-semibold">
      <Link href={'/'}>
        <Image
          src="/logo_2.png"
          width={150}
          height={32}
          alt="Guardería náutica"
          className="h-8 w-auto"
        />
      </Link>
      <nav aria-label="Navegación principal">
        <ul className="flex justify-between gap-x-1">
          {navigationItems.map(({ href, label }) => {
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
      <ButtonLink href="">Iniciar sesión</ButtonLink>
    </header>
  );
}
