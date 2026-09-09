import { type NavIconItem } from '@/interfaces';
import { getDashboardPath } from '@/utils/routes';

export const DASHBOARD_NAV: NavIconItem[] = [
  {
    label: 'Inicio',
    href: getDashboardPath(),
    iconId: 'init',
    roles: ['MEMBER', 'ADMIN', 'OPERATOR'],
  },
  {
    label: 'Mis embarcaciones',
    helperText: 'Visualizá tus embarcaciones y sus datos.',
    href: getDashboardPath('mis-embarcaciones'),
    iconId: 'boat-launch-and-retrieval',
    roles: ['MEMBER'],
  },
  {
    label: 'Embarcaciones',
    href: getDashboardPath('embarcaciones'),
    iconId: 'boat-launch-and-retrieval',
    roles: ['ADMIN'],
  },
  {
    label: 'Solicitudes',
    href: getDashboardPath('solicitudes'),
    iconId: 'documents',
    roles: ['MEMBER', 'ADMIN', 'OPERATOR'],
  },
  {
    label: 'Servicios',
    href: getDashboardPath('servicios'),
    iconId: 'maintenance',
    roles: ['MEMBER', 'ADMIN'],
  },
  {
    label: 'Mi perfil',
    href: getDashboardPath('perfil'),
    iconId: 'user',
    roles: ['MEMBER'],
  },
  {
    label: 'Clientes',
    href: getDashboardPath('clientes'),
    iconId: 'users',
    roles: ['ADMIN'],
  },
  {
    label: 'Operaciones',
    href: getDashboardPath('operaciones'),
    iconId: 'ship-wheel',
    roles: ['OPERATOR'],
  },
];
