'use client';

import { useToast } from '@/hooks/useToast.hook';
import { cn } from '@/lib/cn';

export function CopyButton({ value }: { value: string }) {
  const showToast = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value.replaceAll(' ', ''));
    showToast('Copiado al portapapeles');
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'w-full rounded text-left transition-colors duration-200',
        'hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-blue-900'
      )}
    >
      {value}
    </button>
  );
}
