import Image from 'next/image';

import { navigationItems } from '@/data/navigation.data';

export default function Header() {
  return (
    <header>
      <Image src="/logo.png" width={32} height={32} alt="Guardería náutica" />
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
