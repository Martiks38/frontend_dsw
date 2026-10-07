interface BaseUser {
  publicId: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface ClientListItem extends BaseUser {
  email: string;
}

export interface EmployeeListItem extends BaseUser {
  role: string;
  assignedServices: number;
}

export interface ClientsOverview {
  data: ClientListItem[];
  meta: { total: number; page: number; limit: number; totalPages: number };
  stats: {
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
  };
}
