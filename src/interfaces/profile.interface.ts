export interface EmployeeProfile {
  type: 'employee';
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  joinedAtLabel: string;
}

export interface BusinessProfile {
  type: 'business';
  businessName: string;
  email: string;
  phoneNumber: string;
  documentNumber: string;
}

export interface IndividualProfile {
  type: 'individual';
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  documentNumber: string;
}

export type Profile = EmployeeProfile | BusinessProfile | IndividualProfile;

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  email?: string;
  phoneNumber?: string;
  documentNumber?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ActionResult {
  success: boolean;
  errorMessage?: string;
}
