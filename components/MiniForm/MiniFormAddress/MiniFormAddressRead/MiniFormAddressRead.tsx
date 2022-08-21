import classes from './MiniFormAddressRead.module.css'

interface props {
  readonly value?: string
}

export default function MiniFormAddressRead({ value }: props) {
  return <>{value || <span className={classes.empty}>{'(vide)'}</span>}</>
}
