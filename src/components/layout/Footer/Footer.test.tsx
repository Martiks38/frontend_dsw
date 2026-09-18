import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ImgHTMLAttributes } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
      variant: 'nav',
      items: [
        { kind: 'link', label: 'Inicio', href: '#inicio' },
        { kind: 'link', label: 'Nosotros', href: '#nosotros' },
        { kind: 'link', label: 'Contacto', href: '#contacto' },
      ],
    },
    {
      title: 'Servicios',
      items: [
        { kind: 'text', label: 'Combustible' },
        { kind: 'text', label: 'Limpieza' },
      ],
    },
    {
      title: 'Contacto',
      variant: 'address',
      items: [
        { kind: 'text', label: '+54 341 123 4567', action: 'copy' },
        { kind: 'text', label: 'info@guarderianautica.com', action: 'copy' },
        { kind: 'text', label: 'Av. Costanera 1234, Rosario, Santa Fe' },
      ],
    },
  ],
};

describe('Footer', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza el logo con src y alt correctos', () => {
    renderWithToast(<Footer {...baseProps} />);

    const logo = screen.getByAltText('Logo de la empresa');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });

  it('renderiza un heading (h3) por cada columna con el título correspondiente', () => {
    renderWithToast(<Footer {...baseProps} />);

    expect(
      screen.getByRole('heading', { name: 'Navegación' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Servicios' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Contacto' })
    ).toBeInTheDocument();
  });

  it('renderiza la columna variant="address" con el heading afuera del <address>', () => {
    const { container } = renderWithToast(<Footer {...baseProps} />);

    const addressElem = container.querySelector('address');

    const parentSection = addressElem?.closest('section');
    expect(parentSection).toHaveTextContent('Contacto');

    expect(addressElem?.querySelector('h3')).not.toBeInTheDocument();
  });

  it('renderiza una columna sin variant como <section>', () => {
    const { container } = renderWithToast(<Footer {...baseProps} />);

    const sections = container.querySelectorAll('section');
    expect(sections).toHaveLength(2);

    expect(sections[0]).toHaveTextContent('Servicios');
    expect(sections[1]).toHaveTextContent('Contacto');
  });

  it('renderiza el teléfono con action="copy" como botón', () => {
    renderWithToast(<Footer {...baseProps} />);

    const phoneLink = screen.getByRole('button', { name: '+54 341 123 4567' });

    expect(phoneLink).toBeInTheDocument();
  });

  it('renderiza el email con action="copy" como botón', () => {
    renderWithToast(<Footer {...baseProps} />);

    expect(
      screen.getByRole('button', { name: 'info@guarderianautica.com' })
    ).toBeInTheDocument();
  });

  it('renderiza como texto plano los items sin href ni action', () => {
    renderWithToast(<Footer {...baseProps} />);

    expect(screen.getByText('Combustible')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Combustible' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Combustible' })
    ).not.toBeInTheDocument();
  });

  it('muestra el toast con el label copiado tras el click', async () => {
    const user = userEvent.setup();
    renderWithToast(<Footer {...baseProps} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'info@guarderianautica.com' })
    );

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(
        'Copiado al portapapeles'
      );
    });
  });

  it('renderiza correctamente cuando columns está vacío', () => {
    renderWithToast(<Footer {...baseProps} columns={[]} />);

    expect(screen.queryAllByRole('heading')).toHaveLength(0);
  });

  it('no rompe si Footer se renderiza sin ToastProvider (useToast no-op)', async () => {
    const user = userEvent.setup();
    render(<Footer {...baseProps} />);

    await expect(
      user.click(
        screen.getByRole('button', { name: 'info@guarderianautica.com' })
      )
    ).resolves.not.toThrow();
  });
});
