import { type LucideIcon } from 'lucide-react';

import { type RequestStatus } from './dashboard.interface';

export interface ServiceRequestRow {
  id: number;
  serviceTypeName: string;
  boatName: string;
  dateLabel: string;
  dateISO: string;
  status: RequestStatus;
  href: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ServiceRequestListResponse {
  data: ServiceRequestRow[];
  meta: PaginationMeta;
}
export interface ServiceTypeOption {
  serviceTypeId: number;
  name: string;
}
export interface ServiceRequestSearchParams {
  status?: string;
  serviceTypeId?: string;
  from?: string;
  until?: string;
  page?: string;
}

export interface ServiceRequestData {
  serviceTypeId: number | null;
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}
