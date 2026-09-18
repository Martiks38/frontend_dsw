import { type ServiceRequestData } from '@/interfaces';

interface ServiceStepProps {
  catalog: ServiceRequestData[];
  selectedServiceIds: number[];
  observations: string;
  onServiceToggle: (serviceId: number) => void;
  onObservationsChange: (value: string) => void;
}

export function ServiceStep({
  catalog,
  selectedServiceIds,
  observations,
  onServiceToggle,
  onObservationsChange,
}: ServiceStepProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-slate-700">Servicios</legend>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {catalog.map((service) => {
          const Icon = service.icon;
          const isChecked = selectedServiceIds.includes(service.serviceTypeId!);

          return (
            <label
              key={service.id}
              className="relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 text-center text-sm has-checked:border-blue-600 has-checked:bg-blue-50 has-focus-visible:ring-2 has-focus-visible:ring-blue-500 has-focus-visible:ring-offset-2"
            >
              <input
                type="checkbox"
                name="servicios"
                value={service.serviceTypeId ?? ''}
                checked={isChecked}
                onChange={() => onServiceToggle(service.serviceTypeId!)}
                className="sr-only"
              />
              <Icon aria-hidden="true" className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-slate-900">{service.name}</span>
            </label>
          );
        })}
      </div>

      <div className="mt-4">
        <label
          htmlFor="observations"
          className="block text-sm font-medium text-slate-700"
        >
          Observaciones (opcional)
        </label>
        <textarea
          id="observations"
          value={observations}
          onChange={(e) => onObservationsChange(e.target.value)}
          rows={3}
          maxLength={500}
          className="mt-1 w-full rounded-md border border-slate-500 p-2 text-base"
        />
      </div>
    </fieldset>
  );
}
