import classes from './MiniFormCheckboxRead.module.css'

interface props {
  readonly value?: string
}

export default function MiniFormChechboxRead({ value }: props) {
  return <>{ <span className={classes.empty}>{value  ? 'oui':'non'}</span>}</>
}
