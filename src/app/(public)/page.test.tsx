import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Home from './page';

describe('Home', () => {
  it('renderiza correctamente', () => {
    render(<Home />);

    const $h1 = screen.getByRole('heading', {
      level: 1,
      name: /Nuestro cuidado/i,
    });

    expect($h1).toBeInTheDocument();
  });
});
