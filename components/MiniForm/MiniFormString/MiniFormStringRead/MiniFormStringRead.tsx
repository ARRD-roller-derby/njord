import classes from './MiniFormStringRead.module.css'
import validator from 'validator';

interface props {
  readonly value?: string
}

export default function MiniFormStringRead({ value }: props) {
  return <>{value ? validator.unescape(value) : <span className={classes.empty}>{'(vide)'}</span>}</>
}

export function MiniFormStringLinkRead({ value }: props) {
  return <>{value ? <a href={validator.unescape(value)} rel="noreferrer" target='_blank'>{validator.unescape(value)}</a> : <span className={classes.empty}>{'(vide)'}</span>}</>
}
