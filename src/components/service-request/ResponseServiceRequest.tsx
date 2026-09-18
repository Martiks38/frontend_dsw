import Link from 'next/link';

interface ServiceRequestResult {
  success: boolean;
  message: string;
}

interface Props {
  resetWizard: () => void;
  result: ServiceRequestResult;
  retry: () => void;
}

export function ResponseServiceRequest({ resetWizard, result, retry }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mx-auto max-w-xl rounded-lg p-6 text-center ${
        result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      }`}
    >
      <p className="font-medium">{result.message}</p>

      {result.success ? (
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={resetWizard}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Solicitar otro servicio
          </button>

          <Link
            href="/dashboard/solicitudes"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Ver mis solicitudes
          </Link>
        </div>
      ) : (
        <button
          type="button"
          onClick={retry}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Volver a intentar
        </button>
      )}
    </div>
  );
}
