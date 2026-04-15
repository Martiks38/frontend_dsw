import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renderiza correctamente', () => {
    render(<Home />);

    expect(
      screen.getByText(/to get started, edit the page.tsx file/i)
    ).toBeInTheDocument();
  });
});
