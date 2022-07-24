
export interface MenuLinksInterface {
    readonly href:string
    readonly title:string
    readonly icon:string
}

export const MenuLinks:Array<MenuLinksInterface> = [
    {
        href:'/calendrier',
        title:'Calendrier',
        icon:'/icons/calendar-days.svg'
    },
    {
        href:'/membres',
        title:'Membres',
        icon:'/icons/people-group.svg'
    }
]