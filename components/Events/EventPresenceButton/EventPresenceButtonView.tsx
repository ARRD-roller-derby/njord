import classes from './EventPresenceButton.module.css';

interface Props {
  readonly handleSubmit: Function
  readonly type:boolean
  readonly loading: boolean
}

export default function EventPresenceButtonView({handleSubmit,type,loading}:Props){

  //TODO une checkbox
  return <div className={classes.button} onClick={()=>handleSubmit()} data-presence={type ? 'oui':'non'} data-loading={loading}>
    <div className={classes.yes}>
      oui
    </div>
    <div className={classes.non}>
      non
    </div>
  </div>
}