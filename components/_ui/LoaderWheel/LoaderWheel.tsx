import classes from './LoaderWheel.module.css'

export default function LoaderWheel() {
  return (
    <div className={classes.wheel}>
      <div className={classes.border_wheel}>
        <div className={classes.inside_wheel}>
          <div className={classes.whole_wheel} />
          <div className={classes.screw} />
        </div>
      </div>
    </div>
  )
}
