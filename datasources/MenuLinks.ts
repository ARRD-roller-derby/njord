export interface MenuLinksInterface {
  readonly href: string
  readonly title: string
  readonly icon: string
  readonly admin?: boolean
}

export const MenuLinks: Array<MenuLinksInterface> = [
  {
    href: '/',
    title: 'Accueil',
    icon: '/icons/house.svg',
  },
  {
    href: '/calendrier',
    title: 'Calendrier',
    icon: '/icons/calendar-days.svg',
  },
  {
    href: '/league',
    title: 'Ma league',
    icon: '/icons/flag-pennant.svg',
  },
  {
    href: '/adresses',
    title: 'Mes adresses',
    icon: '/icons/map.svg',
  },
  {
    href: '/stuff',
    title: 'Mon inventaire',
    icon: '/icons/warehouse.svg',
  },
  {
    href: '/news',
    title: 'News',
    icon: '/icons/newspaper.svg',
  },
]

