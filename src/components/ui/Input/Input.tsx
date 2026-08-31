export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="focus-visible:outline-primary rounded-lg border border-(--primary-color-40) px-3 py-2 focus-visible:outline-2"
      {...props}
    />
  );
}
