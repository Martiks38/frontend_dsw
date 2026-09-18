import type { MyBoatCard, ServiceRequestData } from '@/interfaces';

interface ConfirmStepProps {
  selectedBoat: MyBoatCard;
  selectedServices: ServiceRequestData[];
  observations: string;
}

export function ConfirmStep({
  selectedBoat,
  selectedServices,
  observations,
}: ConfirmStepProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 text-sm">
      <h2 className="font-medium text-slate-900">Confirmá tu solicitud</h2>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
        <dt className="font-medium text-slate-600">Embarcación:</dt>
        <dd className="text-slate-700">{selectedBoat?.name}</dd>
        <dt className="font-medium text-slate-600">Servicios:</dt>
        <dd className="text-slate-700">
          {selectedServices.map((s) => s.name).join(', ')}
        </dd>
        {observations && (
          <>
            <dt className="font-medium text-slate-600">Observaciones:</dt>
            <dd className="text-slate-700">{observations}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
