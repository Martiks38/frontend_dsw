import type { FooterColumn } from '@/interfaces';

export const footerColumns: Array<FooterColumn> = [
  {
    title: 'Navegación',
    variant: 'nav',
    items: [
      {
        label: 'Inicio',
        href: '#inicio',
      },
      {
        label: 'Guardería',
        href: '#guarderia',
      },
      {
        label: 'Servicios',
        href: '#servicios',
      },
      {
        label: 'Nosotros',
        href: '#nosotros',
      },
      {
        label: 'Contacto',
        href: '#contacto',
      },
    ],
  },
  {
    title: 'Servicios',
    items: [
      {
        label: 'Combustible',
      },
      {
        label: 'Limpieza',
      },
      {
        label: 'Mantenimiento',
      },
      {
        label: 'Botadura y retiro',
      },
      {
        label: 'Carga de baterías',
      },
      {
        label: 'Reparaciones',
      },
    ],
  },
  {
    title: 'Contacto',
    variant: 'address',
    items: [
      {
        label: '+54 341 123 4567',
        href: 'tel:+543411234567',
      },
      {
        label: 'info@guarderianautica.com',
        action: 'copy',
      },
      {
        label: 'Av. Costanera 1234,Rosario, Santa Fe',
      },
    ],
  },
  {
    title: 'Horarios',
    items: [
      { label: 'Lun, Mié, Jue y Vie: 08:00 - 20:00' },
      { label: 'Sáb, dom y feriados: 08:00 - 19:00' },
      { label: 'Última bajada de embarcaciones 30 min. antes del cierre.' },
    ],
  },
];
