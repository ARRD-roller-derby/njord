import classes from './MiniFormStringRead.module.css'
import validator from 'validator';

interface props {
  readonly value?: string
}

export default function MiniFormStringRead({ value }: props) {
  return <>{value ? validator.unescape(value) : <span className={classes.empty}>{'(vide)'}</span>}</>
}
