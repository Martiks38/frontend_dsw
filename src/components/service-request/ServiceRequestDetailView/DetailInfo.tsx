import { type ServiceRequestDetail } from '@/interfaces';

export function DetailInfo({ detail }: { detail: ServiceRequestDetail }) {
  return (
    <section
      aria-labelledby="detalle-heading"
      className="mt-6 w-fit rounded-lg bg-white p-5 ring-1 ring-slate-100 md:shadow-sm"
    >
      <h2
        id="detalle-heading"
        className="text-base font-semibold text-slate-900"
      >
        Información general
      </h2>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <Dt>Servicio</Dt>
        <Dd>{detail.serviceTypeName}</Dd>

        <Dt>Embarcación</Dt>
        <Dd>{detail.boatName}</Dd>

        <Dt>Cliente</Dt>
        <Dd>{detail.clientName}</Dd>

        <Dt>Solicitada</Dt>
        <Dd>{detail.requestedAtLabel}</Dd>

        {detail.scheduledDateLabel && (
          <>
            <Dt>Programada</Dt>
            <Dd>
              {detail.scheduledDateLabel}
              {detail.scheduledTime ? ` · ${detail.scheduledTime}` : ''}
            </Dd>
          </>
        )}

        {detail.departure && (
          <>
            <Dt>Salida</Dt>
            <Dd>{detail.departure.exitedAtLabel}</Dd>
            <Dt>Regreso estimado</Dt>
            <Dd>{detail.departure.estimatedReturnLabel}</Dd>
            {detail.departure.realReturnLabel && (
              <>
                <Dt>Regreso real</Dt>
                <Dd>{detail.departure.realReturnLabel}</Dd>
              </>
            )}
          </>
        )}

        {detail.sector && (
          <>
            <Dt>Sector</Dt>
            <Dd>{detail.sector}</Dd>
          </>
        )}

        {detail.employeeName && (
          <>
            <Dt>Operario asignado</Dt>
            <Dd>{detail.employeeName}</Dd>
          </>
        )}

        {detail.observations && (
          <>
            <Dt>Observaciones</Dt>
            <Dd>{detail.observations}</Dd>
          </>
        )}
      </dl>
    </section>
  );
}

function Dt({ children }: { children: React.ReactNode }) {
  return <dt className="font-medium text-slate-700">{children}</dt>;
}

function Dd({ children }: { children: React.ReactNode }) {
  return <dd className="w-[20ch] text-slate-800">{children}</dd>;
}
