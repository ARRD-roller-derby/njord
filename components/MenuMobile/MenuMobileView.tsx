import MenuButton from '../_ui/MenuButton/MenuButton'
import classes from './MenuMobile.module.css'
import HomeIcon from '../../public/icons/house.svg'
import LeagueIcon from '../../public/icons/flag-pennant.svg'
import TeamsIcon from '../../public/icons/teams.svg'
import CardIdIcon from '../../public/icons/idcard.svg'
import AddressIcon from '../../public/icons/map.svg'
import CalIcon from '../../public/icons/calendar-days.svg'
import StuffIcon from '../../public/icons/warehouse.svg'
import LinkForMobile from '../_ui/LinkForMobile/LinkForMobile'

interface props {
  readonly goToPage: Function
  readonly isOpen: boolean
  readonly setIsOpen:Function
  readonly isAdmin: boolean
  readonly bureau:boolean
  readonly coach: boolean
}
export default function MenuMobileView({ isOpen, setIsOpen,goToPage,isAdmin,bureau,coach }:props) {
  return (
    <div className={classes.container}>
      <div className={classes.menu} data-isopen={isOpen}>
        <LinkForMobile icon={HomeIcon} label="Accueil" url='/' goToPage={goToPage}/>
        <LinkForMobile icon={LeagueIcon} label="Ma league" url='/league' goToPage={goToPage}/>
        <div className={classes.button}>
          <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <LinkForMobile icon={CalIcon} label="Calendrier" url='/calendrier' goToPage={goToPage}/>
        {/*<LinkForMobile icon={TeamsIcon} label="Mes équipes" url='/teams' goToPage={goToPage}/>*/}
        <LinkForMobile icon={CardIdIcon} label="Mon profil" url='/profile' goToPage={goToPage}/>
        <LinkForMobile icon={AddressIcon} label="Mes adresses" url='/adresses' goToPage={goToPage}/>
        <LinkForMobile icon={StuffIcon} label="inventaire" url='/stuff' goToPage={goToPage}/>
        
      </div>
    </div>
  )
}
