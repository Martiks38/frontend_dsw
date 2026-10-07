import { type NavIconItem } from '@/interfaces';
import { getDashboardPath } from '@/utils/routes';

const DASHBOARD_DATA: NavIconItem[] = [
  {
    label: 'Inicio',
    href: getDashboardPath(),
    iconId: 'init',
    roles: ['MEMBER', 'ADMIN', 'OPERATOR'],
  },
  {
    label: 'Mis embarcaciones',
    helperText: { MEMBER: 'Visualizá tus embarcaciones y sus datos.' },
    href: getDashboardPath('mis-embarcaciones'),
    iconId: 'boat-launch-and-retrieval',
    roles: ['MEMBER'],
  },
  {
    label: 'Embarcaciones',
    href: getDashboardPath('embarcaciones'),
    iconId: 'boat-launch-and-retrieval',
    roles: ['ADMIN'],
    helperText: { ADMIN: 'Listado de embaracaciones registradas' },
  },
  {
    label: 'Solicitudes',
    helperText: {
      ADMIN: 'Gestión de solicitudes de servicios.',
      MEMBER: 'Consultá el estado de tus solicitudes de servicios.',
      OPERATOR: 'Consulá y filtra todas las solicitudes.',
    },
    href: getDashboardPath('solicitudes'),
    iconId: 'documents',
    roles: ['MEMBER', 'ADMIN', 'OPERATOR'],
  },
  {
    label: 'Servicios',
    href: getDashboardPath('servicios'),
    iconId: 'maintenance',
    roles: ['MEMBER', 'ADMIN'],
    helperText: {
      ADMIN: 'Seguimiento de servicios y operaciones',
      MEMBER: 'Conocé nuestros servicios y solicitá el que necesitás.',
    },
  },
  {
    label: 'Mi perfil',
    href: getDashboardPath('perfil'),
    iconId: 'user',
    roles: ['MEMBER', 'OPERATOR', 'ADMIN'],
    helperText: {
      MEMBER: 'Actualizá tus datos personales y de acceso.',
      ADMIN: 'Actualizá tus datos personales y de acceso.',
      OPERATOR: 'Actualizá tus datos personales y de acceso.',
    },
  },
  {
    label: 'Clientes',
    href: getDashboardPath('clientes'),
    iconId: 'users',
    roles: ['ADMIN'],
    helperText: { ADMIN: 'Gestioná la información de los clientes.' },
  },
  {
    label: 'Empleados',
    href: getDashboardPath('empleados'),
    iconId: 'users',
    roles: ['ADMIN'],
    helperText: { ADMIN: 'Gestioná del personal.' },
  },
  {
    label: 'Mis tareas de hoy',
    href: getDashboardPath('tareas-hoy'),
    iconId: 'users',
    roles: ['OPERATOR'],
    helperText: { OPERATOR: 'Solicitudes asignadas para el día de hoy.' },
  },
  {
    label: 'Operaciones',
    href: getDashboardPath('operaciones'),
    iconId: 'ship-wheel',
    roles: ['OPERATOR'],
    helperText: { MEMBER: '' },
  },
];

export const DASHBOARD_SIDEBAR_NAV: Omit<NavIconItem, 'helperText'>[] =
  DASHBOARD_DATA.map((item) => {
    const { label, href, iconId, roles } = item;

    return {
      label,
      href,
      iconId,
      roles,
    };
  });

export const DASHBOARD_PAGE_TITLE: Omit<NavIconItem, 'iconId'>[] = [
  ...DASHBOARD_DATA.map((item) => {
    const { href, label, roles, helperText } = item;

    return {
      label,
      roles,
      href,
      helperText,
    };
  }),
  {
    label: 'Solicitar servicios',
    href: getDashboardPath('servicios/solicitar'),
    roles: ['MEMBER'],
  },
];
