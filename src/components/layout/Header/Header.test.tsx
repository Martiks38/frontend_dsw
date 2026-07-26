import { render, screen } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { navigationItems } from '@/data/navigation.data';

import Header from './Header';

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

describe('<Header />', () => {
  it('renderiza el logo con src y alt correctos', () => {
    render(<Header />);

    const logo = screen.getByAltText('Guardería náutica');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });

  it('renderiza el nav con su aria-label', () => {
    render(<Header />);

    expect(
      screen.getByRole('navigation', { name: 'Navegación principal' })
    ).toBeInTheDocument();
  });

  it('renderiza un link por cada item de navigationItems', () => {
    render(<Header />);

    navigationItems.forEach(({ label, href }) => {
      const link = screen.getByRole('link', { name: label });

      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renderiza la cantidad correcta de links de navegación', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation', {
      name: 'Navegación principal',
    });
    const links = nav.querySelectorAll('a');

    expect(links).toHaveLength(navigationItems.length);
  });
});
