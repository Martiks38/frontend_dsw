export type ContactType = 'address' | 'phone' | 'email';

export interface ContactItem {
  type: ContactType;
  label: string;
  value: string;
  action?: 'copy';
}
