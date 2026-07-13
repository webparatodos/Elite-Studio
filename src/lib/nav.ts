export type NavChild = { label: string; href: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

export const getNavItems = (tiendaUrl: string): NavItem[] => [
  { label: 'Home', href: '/' },
  {
    label: 'Baile',
    href: '/servicios/clases-de-baile',
    children: [
      { label: 'Clases Abiertas', href: '/servicios/clases-de-baile' },
      { label: 'Formación Profesional', href: '/servicios/formacion-profesional' },
      { label: 'Campamento', href: '/servicios/campamento' },
    ],
  },
  { label: 'Alquiler', href: '/servicios/alquiler-de-salas' },
  { label: 'Agencia', href: '/servicios/agencia-de-representacion' },
  {
    label: 'Audiovisual',
    href: '/servicios/produccion-audiovisual',
    children: [
      { label: 'Prod. Audiovisual', href: '/servicios/produccion-audiovisual' },
      { label: 'Estudio de Foto', href: '/servicios/estudio-de-foto' },
      { label: 'Diseño Gráfico', href: '/servicios/diseno-grafico' },
    ],
  },
  { label: 'Music', href: '/music' },
  { label: 'Tienda', href: tiendaUrl || '#tienda' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]
