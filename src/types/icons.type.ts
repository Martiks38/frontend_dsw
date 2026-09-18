export type BenefitsIconName =
  | 'security'
  | 'integral-care'
  | 'secure-storage'
  | 'on-demand-availability';

export type ServiceIconName =
  | 'fuel'
  | 'cleaning'
  | 'maintenance'
  | 'boat-launch-and-retrieval'
  | 'battery-charging'
  | 'repairs';

export type CompanyValuesIconName =
  | 'wind-rose-compass'
  | 'handshake'
  | 'anchor'
  | 'communication'
  | 'certificate'
  | 'compass';

export type ContactIconName = 'location' | 'phone' | 'email' | 'clock';

export type PasswordIconName = 'eye' | 'eye-slash';

export type IconName =
  | BenefitsIconName
  | CompanyValuesIconName
  | ServiceIconName
  | ContactIconName
  | PasswordIconName;
