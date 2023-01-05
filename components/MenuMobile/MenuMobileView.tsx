import MenuButton from '../_ui/MenuButton/MenuButton'
import classes from './MenuMobile.module.css'
import HomeIcon from '../../public/icons/house.svg'
import LeagueIcon from '../../public/icons/flag-pennant.svg'
import TeamsIcon from '../../public/icons/teams.svg'
import CardIdIcon from '../../public/icons/idcard.svg'
import StoreIcon from '../../public/icons/store.svg'
import QuestionIcon from '../../public/icons/question.svg'
import AddressIcon from '../../public/icons/map.svg'
import CalIcon from '../../public/icons/calendar-days.svg'
import StuffIcon from '../../public/icons/warehouse.svg'
import NewsIcon from '../../public/icons/newspaper.svg'
import BlockQuestionIcon from '../../public/icons/block-question.svg'
import LinkForMobile from '../_ui/LinkForMobile/LinkForMobile'
import RankingIcon from '../../public/icons/ranking.svg'

interface props {
  goToPage: Function
  isOpen: boolean
  setIsOpen: Function
  isAdmin: boolean
  isAdmin_game: boolean
  bureau: boolean
  coach: boolean
}
export default function MenuMobileView({ isOpen, setIsOpen, goToPage, isAdmin, isAdmin_game, bureau, coach }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.menu} data-isopen={isOpen}>
        <LinkForMobile icon={HomeIcon} label="Accueil" url='/' goToPage={goToPage} />
        <LinkForMobile icon={RankingIcon} label="Classement" url='/classement' goToPage={goToPage} />

        <div className={classes.button}>
          <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <LinkForMobile icon={QuestionIcon} label="Concours" url='/daily-contest' goToPage={goToPage} />
        <LinkForMobile icon={StoreIcon} label="Boutique" url='/shop' goToPage={goToPage} />

        <LinkForMobile icon={NewsIcon} label="News" url='/news' goToPage={goToPage} />
        {/*<LinkForMobile icon={TeamsIcon} label="Mes équipes" url='/teams' goToPage={goToPage}/>*/}
        <LinkForMobile icon={CardIdIcon} label="Mon profil" url='/profile' goToPage={goToPage} />
        <LinkForMobile icon={CalIcon} label="Calendrier" url='/calendrier' goToPage={goToPage} />
        <LinkForMobile icon={LeagueIcon} label="Ma league" url='/league' goToPage={goToPage} />
        <LinkForMobile icon={AddressIcon} label="Mes adresses" url='/adresses' goToPage={goToPage} />
        <LinkForMobile icon={StuffIcon} label="inventaire" url='/stuff' goToPage={goToPage} />
        {(isAdmin || isAdmin_game) && <LinkForMobile icon={BlockQuestionIcon} label="questions" url='/questions' goToPage={goToPage} />}

      </div>
    </div>
  )
}
