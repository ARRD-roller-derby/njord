export interface MenuLinksInterface {
  href: string
  title: string
  icon: string
  admin?: boolean
  admin_game?: boolean
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
    href: '/daily-contest',
    title: 'Défi quotidien',
    icon: '/icons/question.svg',
  },
  {
    href: '/classement',
    title: 'Classement',
    icon: '/icons/ranking.svg',
  },
  {
    href: '/shop',
    title: 'Boutique',
    icon: '/icons/store.svg',
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
  {
    href: '/sondages',
    title: 'Sondages',
    icon: '/icons/poll.svg',
  },
  {
    href: '/questions',
    title: 'Questions',
    icon: '/icons/block-question.svg',
    admin_game: true,
    admin: true
  },
  {
    href: '/sponsors',
    title: 'Sponsors',
    icon: '/icons/sponsor.svg',
    admin: true
  },

]

