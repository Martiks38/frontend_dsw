import { render, screen } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { navigationItems } from '@/data';

import Header from './Header';

const logoProps = {
  src: 'img.png',
  alt: 'alt',
};

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

describe('<Header />', () => {
  it('renderiza el logo con src y alt correctos', () => {
    render(<Header srcLogo={logoProps.src} altLogo={logoProps.alt} />);

    const logo = screen.getByAltText(logoProps.alt);

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', logoProps.src);
  });

  it('renderiza el nav con su aria-label', () => {
    render(<Header srcLogo={logoProps.src} altLogo={logoProps.alt} />);

    expect(
      screen.getByRole('navigation', { name: 'Navegación principal' })
    ).toBeInTheDocument();
  });

  it('renderiza un link por cada item de navigationItems', () => {
    render(<Header srcLogo={logoProps.src} altLogo={logoProps.alt} />);

    navigationItems.forEach(({ label, href }) => {
      const link = screen.getByRole('link', { name: label });

      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renderiza la cantidad correcta de links de navegación', () => {
    render(<Header srcLogo={logoProps.src} altLogo={logoProps.alt} />);

    const nav = screen.getByRole('navigation', {
      name: 'Navegación principal',
    });
    const links = nav.querySelectorAll('a');

    expect(links).toHaveLength(navigationItems.length);
  });
});
