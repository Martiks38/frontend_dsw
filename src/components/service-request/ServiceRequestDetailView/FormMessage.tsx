interface Props {
  message: string | null;
  error: string | null;
}

export function FormMessage({ message, error }: Props) {
  if (!message && !error) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-4 rounded-md p-3 text-sm ${
        error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
      }`}
    >
      {error ?? message}
    </div>
  );
}
