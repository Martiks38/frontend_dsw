export type RequestStatus =
  | 'PENDING'
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELED';

export interface TaskItem {
  id: number;
  scheduledAtISO: string;
  scheduledAtLabel: string;
  serviceTypeName: string;
  boatName: string;
  clientName: string;
  status: RequestStatus;
  href: string;
}

export interface PendingRequestRow {
  id: number;
  clientName: string;
  boatName: string;
  dateLabel: string;
  dateISO: string;
  href: string;
}

export interface ServiceRankingItem {
  id: number;
  name: string;
  count: number;
}

export interface MemberDashboardStats {
  activeBoats: number;
  pendingRequests: number;
  servicesThisMonth: number;
  nextServiceInDays: number | null;
}

export interface MemberDashboardData {
  stats: MemberDashboardStats;
  pendingTasks: TaskItem[];
  serviceCountsThisMonth: ServiceRankingItem[];
}

export interface OperatorDashboardStats {
  tasksToday: number;
  inProgress: number;
  completedToday: number;
  totalThisMonth: number;
}

export interface OperatorDashboardData {
  stats: OperatorDashboardStats;
  todayTasks: TaskItem[];
  topServicesThisMonth: ServiceRankingItem[];
}

export interface AdminDashboardStats {
  clients: number;
  newClientsThisMonth: number;
  boats: number;
  newBoatsThisMonth: number;
  pendingRequests: number;
  servicesInProgressToday: number;
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  pendingRequests: PendingRequestRow[];
}

export interface MemberDashboardProps {
  data: MemberDashboardData;
}

export interface OperatorDashboardProps {
  data: OperatorDashboardData;
}

export interface AdminDashboardProps {
  data: AdminDashboardData;
}

export type DashboardVariant =
  | ({ role: 'MEMBER' } & MemberDashboardProps)
  | ({ role: 'OPERATOR' } & OperatorDashboardProps)
  | ({ role: 'ADMIN' } & AdminDashboardProps);
