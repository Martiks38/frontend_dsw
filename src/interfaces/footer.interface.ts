export type FooterItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'text'; label: string; action?: 'copy' }
  | { kind: 'schedule'; label: string; value: string };

export interface FooterColumn {
  title: string;
  variant?: 'nav' | 'address' | 'section';
  items: FooterItem[];
}

export interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  columns: FooterColumn[];
}
