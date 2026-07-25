import { render, screen } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { FooterProps } from '@/interfaces';
import { ToastProvider } from '@/providers/ToastProvider';

import Footer from './Footer';

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

function renderWithToast(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

const baseProps: FooterProps = {
  logoSrc: '/logo.png',
  logoAlt: 'Logo de la empresa',
  columns: [
    {
      title: 'Navegación',
      items: [
        {
          label: 'Inicio',
          href: '#inicio',
        },
        {
          label: 'Nosotros',
          href: '#nosotros',
        },
        {
          label: 'Contacto',
          href: '#contacto',
        },
      ],
    },
    {
      title: 'Servicios',
      items: [{ label: 'Combustible' }, { label: 'Limpieza' }],
    },
    {
      title: 'Compañía',
      items: [{ label: 'Sobre nosotros', href: '/about' }],
    },
  ],
};

describe('Footer', () => {
  it('renderiza correctamente', () => {
    render(<Footer {...baseProps} />);
  });
});
