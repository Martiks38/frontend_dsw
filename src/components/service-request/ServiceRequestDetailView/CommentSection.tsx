'use client';

import { useState } from 'react';

interface Props {
  initialComment: string;
  disabled: boolean;
  onSave: (comment: string) => void;
}

export function CommentSection({ initialComment, disabled, onSave }: Props) {
  const [comment, setComment] = useState(initialComment);

  return (
    <section
      aria-labelledby="comentario-heading"
      className="mt-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100"
    >
      <h2
        id="comentario-heading"
        className="text-base font-semibold text-slate-900"
      >
        Comentario interno
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Solo visible para el equipo, no para el socio.
      </p>

      <label htmlFor="internalComment" className="sr-only">
        Comentario interno
      </label>
      <textarea
        id="internalComment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        maxLength={1000}
        className="mt-2 w-full rounded-md border-slate-300 text-sm"
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => onSave(comment)}
        className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Guardar comentario
      </button>
    </section>
  );
}
