import { type MyBoatCard } from '@/interfaces';

export function BoatCard({ boat }: { boat: MyBoatCard }) {
  return (
    <article className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <h3 className="text-base font-semibold text-slate-900">{boat.name}</h3>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
        <Dt>Modelo:</Dt>
        <Dd className="text-slate-600">{boat.model}</Dd>

        <Dt>Matrícula:</Dt>
        <Dd className="text-slate-600">{boat.registrationNumber}</Dd>

        {boat?.contractStartLabel && (
          <>
            <Dt>Ingreso:</Dt>
            <Dd className="text-slate-600">{boat.contractStartLabel}</Dd>
          </>
        )}

        {boat?.cradleCode && (
          <>
            <Dt>Cuna:</Dt>
            <Dd className="text-slate-600">{boat.cradleCode}</Dd>
          </>
        )}

        <Dt>Estado:</Dt>
        <Dd className={boat.isInGuardia ? 'text-green-600' : 'text-slate-500'}>
          {boat.isInGuardia ? 'En guardería' : 'Sin guarda activa'}
        </Dd>
      </dl>
    </article>
  );
}

function Dt({ children }: { children: React.ReactNode }) {
  return <dt className="font-medium text-slate-700">{children}</dt>;
}

function Dd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <dd className={className}>{children}</dd>;
}
