import { type MyBoatCard } from '@/interfaces';

interface BoatStepProps {
  boatId: string;
  boats: MyBoatCard[];
  onBoatChange: (boatId: string) => void;
}

export function BoatStep({ boatId, boats, onBoatChange }: BoatStepProps) {
  return (
    <div>
      <label
        htmlFor="boat"
        className="block text-sm font-medium text-slate-700"
      >
        Embarcación
      </label>
      <select
        id="boat"
        value={boatId}
        onChange={(e) => onBoatChange(e.target.value)}
        className="mt-1 w-full rounded-md border-slate-300 text-sm"
      >
        {boats.map((boat) => (
          <option key={boat.id} value={boat.id}>
            {boat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
