import classes from './MiniFormDateRead.module.css'
import dayjs from 'dayjs';

interface props {
  readonly value?: string
}

export default function MiniFormDateRead({ value }: props) {
  return <>{value ? dayjs(value).format('LL'): <span className={classes.empty}>{'(vide)'}</span>}</>
}
