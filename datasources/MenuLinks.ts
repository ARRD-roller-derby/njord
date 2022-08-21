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
    href: '/teams',
    title: 'Mes équipes',
    icon: '/icons/teams.svg',
  },
  {
    href: '/adresses',
    title: 'Mes adresses',
    icon: '/icons/map.svg',
  },
]
