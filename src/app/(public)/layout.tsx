'use client';

import { useRef } from 'react';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { FOOTER_COLUMNS } from '@/data';
import { useIsVisible } from '@/hooks/useIsVisible.hook';

interface HomeContentProps {
  children: React.ReactNode;
}

export default function Home({ children }: HomeContentProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isSentinelVisible = useIsVisible(sentinelRef, {
    rootMargin: '0px 0px -50px 0px',
  });

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl grow flex-col justify-center justify-items-center">
      <Header
        srcLogo="/logo_2.png"
        altLogo="Guardería náutica"
        className={
          isSentinelVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }
      />
      <main id="main-content" tabIndex={-1}>
        {children}
        <div ref={sentinelRef} aria-hidden="true" className="h-px"></div>
      </main>
      <Footer
        logoSrc="/logo_2.png"
        logoAlt="Guardería náutica"
        columns={FOOTER_COLUMNS}
      />
    </div>
  );
}
