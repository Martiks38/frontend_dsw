export function FormError({ error }: { error?: string[] }) {
  if (!error) return null;

  return error.map((err, ind) => {
    return (
      <p key={ind} className="mt-1 py-2 text-xs text-red-500 italic">
        {err}
      </p>
    );
  });
}
