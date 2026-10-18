import type { ActionResult } from '@/interfaces/profile.interface';

export interface BoatSearchResult {
  publicId: string;
  name: string;
  registrationNumber?: string;
  ownerName?: string;
  model?: string;
}

export interface ActiveDeparture {
  boatDepartureId: number;
  publicId: string;
  exitedAt: string;
  estimatedReturnDatetime: string;
  realReturnDatetime: string | null;
  boatName: string;
  registrationNumber: string;
  ownerName: string;
}

export interface DataActionResult<T> extends ActionResult {
  data?: T;
}
