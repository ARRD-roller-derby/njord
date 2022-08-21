import FlexCol from '../../_ui/FlexCol/FlexCol'
import Info from '../../_ui/Info/Info'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import LeagueSelector from '../LeagueSelector/LeagueSelector'
import classes from './LeagueRequestForm.module.css'

interface props {
  readonly onSelect: Function
  readonly submit: Function
  readonly loading: boolean
}

export default function LeagueRequestFormView({ onSelect, submit,loading }: props) {
  return (
    <form className={classes.container} onSubmit={(e)=>submit(e)}>
      <FlexCol>
        <label>Rechercher une association</label>
        <LeagueSelector onSelect={onSelect} />
        <Info>
          <p>
            Nous effectuons une recherche dans le répertoire des associations.
          </p>
          <p>
            Nous vous conseillons de rechercher votre league par son nom
            officiel
          </p>
        </Info>

        <SubmitButton text="Envoyer la demande" loading={loading} onClick={(e:any)=>submit(e)}/>
    
      </FlexCol>
    </form>
  )
}
