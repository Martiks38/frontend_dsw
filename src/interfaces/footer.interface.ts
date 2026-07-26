interface FooterItem {
  label: string;
  href?: string;
  action?: 'copy';
}

export interface FooterColumn {
  title: string;
  variant?: 'nav' | 'address';
  items: FooterItem[];
}

export interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  columns: FooterColumn[];
}
