export type BoatAdminStatus = 'EN_GUARDIA' | 'EN_AGUA' | 'EN_MANTENIMIENTO';

export interface BoatAdminListItem {
  id: string;
  registrationNumber: string;
  name: string;
  ownerName: string;
  boatTypeName: string;
  status: BoatAdminStatus;
  cradleCode: string | null;
  plannedEndDatetimeLabel: string | null;
}

export interface BoatsAdminOverview {
  data: BoatAdminListItem[];
  stats: {
    total: number;
    enAgua: number;
    enGuardia: number;
    enMantenimiento: number;
  };
}

export interface GuardiaOverview {
  data: BoatAdminListItem[];
  stats: {
    totalEnGuardia: number;
    occupiedCradles: number;
    totalCradles: number;
    upcomingDepartures: number;
    avgStayDays: number;
  };
}
