import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Toast from './Toast';

describe('<Toast />', () => {
  const msg = 'Copiado.';

  it('renderiza el mensaje recibido', () => {
    render(<Toast message={msg} />);

    expect(screen.getByText(msg)).toBeInTheDocument();
  });

  it('expone role="status" para lectores de pantalla', () => {
    render(<Toast message={msg} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('tiene aria-live="polite" para no interrumpir al usuario', () => {
    render(<Toast message={msg} />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
