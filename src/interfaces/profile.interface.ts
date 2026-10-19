interface BaseProfile {
  email: string;
  phoneNumber: string;
}

interface PersonProfile extends BaseProfile {
  firstName: string;
  lastName: string;
}

// ----------------------------------------------------------------------
// 2. PERFILES ESPECÍFICOS (Discriminados por la propiedad 'type')
// ----------------------------------------------------------------------

export interface EmployeeProfile extends PersonProfile {
  type: 'employee';
  role: string;
  joinedAtLabel: string;
}

export interface BusinessProfile extends BaseProfile {
  type: 'business';
  businessName: string;
  documentNumber: string;
}

export interface IndividualProfile extends PersonProfile {
  type: 'individual';
  documentNumber: string;
}

export type Profile = EmployeeProfile | BusinessProfile | IndividualProfile;

// ----------------------------------------------------------------------
// 3. INPUTS Y RESULTADOS
// ----------------------------------------------------------------------

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
