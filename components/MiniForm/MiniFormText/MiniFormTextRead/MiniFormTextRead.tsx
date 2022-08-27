import classes from './MiniFormTextRead.module.css'

interface props {
  readonly value?: string
}

//TODO ajouter le Markdown reader
export default function MiniFormTextRead({ value }: props) {
  return <>{value || <span className={classes.empty}>{'(vide)'}</span>}</>
}
