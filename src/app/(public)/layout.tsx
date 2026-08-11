import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { FOOTER_COLUMNS } from '@/data';

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl grow flex-col justify-center justify-items-center">
      <Header srcLogo="/logo_2.png" altLogo="Guardería náutica" />
      <main id="main-content" className="mt-(--height-header)" tabIndex={-1}>
        {children}
      </main>
      <Footer
        logoSrc="/logo_2.png"
        logoAlt="Guardería náutica"
        columns={FOOTER_COLUMNS}
      />
    </div>
  );
}
