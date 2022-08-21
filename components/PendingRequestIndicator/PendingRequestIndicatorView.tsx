import classes from './PendingRequestIndicator.module.css'

interface props {
  readonly request: string
}

export default function PendingRequestIndicatorView({ request }: props) {
  return request && <div className={classes.request}>{request}</div>
}
