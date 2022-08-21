import classes from './NotificationIndicator.module.css';

interface props {
  readonly numOfNotif: string
}
export default function NotificationIndicatorView({numOfNotif}:props) {

  return parseInt(numOfNotif) > 0 && (
        <div className={classes.count}> {numOfNotif}</div>
      )
}
