// ToastProvider.test.tsx
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useToast } from '@/hooks/useToast.hook';

import { ToastProvider } from './ToastProvider';

function TestConsumer({ label = 'Disparar toast' }: { label?: string }) {
  const showToast = useToast();
  return (
    <button onClick={() => showToast('Copiado con éxito')} type="button">
      {label}
    </button>
  );
}

describe('<ToastProvider />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('no muestra ningún toast inicialmente', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('muestra el toast al invocar showToast', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disparar toast' }));

    expect(screen.getByRole('status')).toHaveTextContent('Copiado con éxito');
  });

  it('oculta el toast después de 3 segundos', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disparar toast' }));
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('reinicia el timer si se llama showToast de nuevo antes de que expire', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    const button = screen.getByRole('button', { name: 'Disparar toast' });

    fireEvent.click(button);
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('limpia el timeout pendiente al desmontar', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disparar toast' }));
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('useToast no rompe si se usa fuera del Provider (default no-op)', () => {
    render(<TestConsumer />);

    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Disparar toast' }));
    }).not.toThrow();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
