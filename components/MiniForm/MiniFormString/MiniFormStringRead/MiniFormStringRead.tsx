import classes from './MiniFormStringRead.module.css'

interface props {
  readonly value?: string
}

export default function MiniFormStringRead({ value }: props) {
  return <>{value || <span className={classes.empty}>{'(vide)'}</span>}</>
}
