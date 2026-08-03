'use client';

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className="bg-primary text-surface fixed right-8 bottom-8 z-50 rounded px-4 py-2 shadow-lg"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}
