import Image from 'next/image';
import Link from 'next/link';

import { navigationItems } from '@/data';

export default function Header() {
  return (
    <header>
      <Link href={'/'}>
        <Image src="/logo.png" width={32} height={32} alt="Guardería náutica" />
      </Link>
      <nav aria-label="Navegación principal">
        <ul>
          {navigationItems.map(({ href, label }) => {
            return (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <a href="/login">Iniciar sesión</a>
    </header>
  );
}
