import classes from './ScrollHContainer.module.css'

interface Props {
  readonly children: Array<JSX.Element>
  readonly id: string
  readonly isMobileDevice: boolean
}
export default function ScrollHContainerView({
  children,
  id,
  isMobileDevice,
}: Props) {
  return (
    <div className={classes.container} id={id} data-ismobile={isMobileDevice}>
      {children}
    </div>
  )
}
