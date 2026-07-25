'use client';

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
