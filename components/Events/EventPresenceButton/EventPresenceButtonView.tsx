import classes from './EventPresenceButton.module.css';

interface Props {
  readonly handleSubmit: Function
  readonly type:boolean
}

export default function EventPresenceButtonView({handleSubmit,type}:Props){

  //TODO une checkbox
  return <div className={classes.button} onClick={()=>handleSubmit()}>{type ? 'oui':'non'}</div>
}