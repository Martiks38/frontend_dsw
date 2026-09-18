'use client';

import { useState, useTransition } from 'react';

import { actions } from '@/app/actions';
import { SERVICES_CATALOG } from '@/data';
import type { MyBoatCard, ServiceTypeOption } from '@/interfaces';

import { SEQUENCE } from './consts';
import { ProgressiveButtonsPanel } from './ProgressiveButtonsPanel';
import { ResponseServiceRequest } from './ResponseServiceRequest';
import { StepsDisplay } from './StepsDisplay';
import { StepView } from './StepView';

const {
  serviceRequest: { createServiceRequest },
} = actions;

interface Props {
  boats: MyBoatCard[];
  serviceTypes: ServiceTypeOption[];
  preselectedServiceSlug?: string;
}

function useCatalogWithRealIds(serviceTypes: ServiceTypeOption[]) {
  return SERVICES_CATALOG.map((catalogItem) => {
    const match = serviceTypes.find(
      (st) => st.name.toLowerCase() === catalogItem.name.toLowerCase()
    );
    return { ...catalogItem, serviceTypeId: match?.serviceTypeId ?? null };
  }).filter((item) => item.serviceTypeId !== null);
}

export function ServiceRequestWizard({
  boats,
  serviceTypes,
  preselectedServiceSlug,
}: Props) {
  const catalog = useCatalogWithRealIds(serviceTypes);
  const preselectedMatch = catalog.find((s) => s.id === preselectedServiceSlug);

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = SEQUENCE[stepIndex];

  const [boatId, setBoatId] = useState<string>(boats[0]?.id ?? '');
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>(
    preselectedMatch ? [preselectedMatch.serviceTypeId!] : []
  );
  const [observations, setObservations] = useState('');
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleService(id: number) {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const selectedBoat = boats.find((b) => b.id === boatId);
  const selectedServices = catalog.filter((s) =>
    selectedServiceIds.includes(s.serviceTypeId!)
  );

  function goNext() {
    setStepIndex((current) => Math.min(SEQUENCE.length - 1, current + 1));
  }

  function goBack() {
    setStepIndex((current) => Math.max(0, current - 1));
  }

  function resetWizard() {
    setStepIndex(0);
    setBoatId(boats[0]?.id ?? '');
    setSelectedServiceIds(
      preselectedMatch ? [preselectedMatch.serviceTypeId!] : []
    );
    setObservations('');
    setResult(null);
  }

  function handleConfirm() {
    if (!selectedBoat || selectedServiceIds.length === 0) return;

    startTransition(async () => {
      const response = await createServiceRequest({
        boatId: selectedBoat.id,
        serviceTypeIds: selectedServiceIds,
        observations: observations || undefined,
      });

      setResult(
        response.success
          ? { success: true, message: 'Su solicitud ha sido registrada.' }
          : {
              success: false,
              message:
                response.errorMessage ??
                'Ocurrió un error. Intente nuevamente.',
            }
      );
    });
  }

  if (!selectedBoat || boats.length === 0) {
    return (
      <div className="mx-auto max-w-xl text-center text-sm text-slate-500">
        Todavía no tenés embarcaciones en la guardería. Por lo que no podrás
        solicitar servicios.
      </div>
    );
  }

  if (result) {
    return (
      <ResponseServiceRequest
        resetWizard={resetWizard}
        result={result}
        retry={() => setResult(null)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <StepsDisplay stepIndex={stepIndex} />

      <StepView
        step={currentStep}
        ctx={{
          boatId,
          boats,
          onBoatChange: setBoatId,
          catalog,
          selectedServiceIds,
          onServiceToggle: toggleService,
          observations,
          onObservationsChange: setObservations,
          selectedBoat,
          selectedServices,
        }}
      />

      <ProgressiveButtonsPanel
        fn={{
          goBack,
          goNext,
          handleConfirm,
        }}
        stepIndex={stepIndex}
        currentStep={currentStep}
        isPending={isPending}
        selectedServiceIds={selectedServiceIds}
      />
    </div>
  );
}
