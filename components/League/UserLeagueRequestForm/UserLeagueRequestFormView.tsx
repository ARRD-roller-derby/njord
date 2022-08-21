import EmailSelector from '../../User/EmailSelector/EmailSelector'
import FlexCol from '../../_ui/FlexCol/FlexCol'
import Info from '../../_ui/Info/Info'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import classes from './UserLeagueRequestForm.module.css'

interface props {
  readonly onSelect: Function
  readonly submit: Function
  readonly loading: boolean
}

export default function UserLeagueRequestFormView({ onSelect, submit,loading }: props) {
  return (
    <form className={classes.container} onSubmit={(e)=>submit(e)}>
      <FlexCol>
        <label>Rechercher un utilisateur</label>
        <EmailSelector onSelect={onSelect} />
        <Info>
          <p>
            {"L'utilisateur recevra un mail l'invitant à rejoindre la league."}
          </p>
          <p>
            Vous pouvez sélectionner plusieurs adresses.
          </p>
        </Info>

        <SubmitButton text="Envoyer la demande" loading={loading} onClick={(e:any)=>submit(e)}/>
    
      </FlexCol>
    </form>
  )
}
