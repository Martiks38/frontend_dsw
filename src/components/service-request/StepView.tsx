import type { MyBoatCard, ServiceRequestData } from '@/interfaces';

import { BoatStep } from './BoatStep';
import { ConfirmStep } from './ConfirmStep';
import { type StepKey } from './consts';
import { ServiceStep } from './ServiceStep';

interface StepContext {
  boatId: string;
  boats: MyBoatCard[];
  onBoatChange: (boatId: string) => void;

  catalog: ServiceRequestData[];
  selectedServiceIds: number[];
  onServiceToggle: (serviceId: number) => void;

  observations: string;
  onObservationsChange: (value: string) => void;

  selectedBoat: MyBoatCard;
  selectedServices: ServiceRequestData[];
}

type StepStrategy = (context: StepContext) => React.ReactNode;

const STEP_STRATEGIES: Record<StepKey, StepStrategy> = {
  boat: (context) => <BoatStep {...context} />,
  service: (context) => <ServiceStep {...context} />,
  confirm: (context) => <ConfirmStep {...context} />,
};

export function StepView({ step, ctx }: { step: StepKey; ctx: StepContext }) {
  return <div className="mt-6">{STEP_STRATEGIES[step](ctx)}</div>;
}
