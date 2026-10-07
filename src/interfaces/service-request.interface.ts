import { type LucideIcon } from 'lucide-react';

import { type RequestStatus } from './dashboard.interface';

// ----------------------------------------------------------------------
// 1. COMPONENTES / FILTROS / OPCIONES BÁSICAS
// ----------------------------------------------------------------------

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ServiceTypeOption {
  serviceTypeId: number;
  name: string;
}

export interface OperatorOption {
  publicId: string;
  firstName: string;
  lastName: string;
  totalThisMonth: number;
}

export interface ServiceRequestSearchParams {
  status?: string;
  serviceTypeId?: string;
  from?: string;
  until?: string;
  page?: string;
  search?: string;
}

export interface ServiceRequestData {
  serviceTypeId: number | null;
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

// ----------------------------------------------------------------------
// 2. MODELOS PRINCIPALES (Usando herencia para evitar duplicación)
// ----------------------------------------------------------------------

interface BaseServiceRequest {
  id: number;
  status: RequestStatus;
  serviceTypeName: string;
  boatName: string;
  clientName: string;
  employeeName: string | null;
}

export interface ServiceRequestRow extends BaseServiceRequest {
  dateLabel: string;
  dateISO: string;
  href: string;
}

export interface ServiceRequestDetail extends BaseServiceRequest {
  requestedAtLabel: string;
  scheduledDateLabel: string | null;
  scheduledTime: string | null;
  sector: string | null;
  observations: string | null;
  internalComment: string | null;
  canCancel: boolean;
  canUpdateStatus: boolean;
  canEditComment: boolean;
  isDepartureService: boolean;
  departure: {
    exitedAtLabel: string;
    estimatedReturnLabel: string;
    realReturnLabel: string | null;
  } | null;
}

export interface AssignmentForm {
  employeeId: string;
  scheduledDate: string;
  scheduledTime: string;
  sector: string;
}

export interface Operator {
  id: string;
  firstName: string;
  lastName: string;
  totalThisMonth: number;
}

// ----------------------------------------------------------------------
// 3. RESPUESTAS Y ACCIONES
// ----------------------------------------------------------------------

export type StatusCounts = Record<RequestStatus, number> & { ALL: number };

export interface ServiceRequestListResponse {
  data: ServiceRequestRow[];
  meta: PaginationMeta;
  statusCounts?: StatusCounts;
}

export interface AssignServiceRequestInput {
  employeeId: string;
  scheduledDate: string;
  scheduledTime: string;
  sector?: string;
}
