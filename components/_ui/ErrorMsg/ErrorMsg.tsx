import classes from './ErrorMsg.module.css';

interface props {
  readonly message: string
}
export default function ErrorMsg({message}:props){

  return <div className={classes.container}>{message}</div>
}