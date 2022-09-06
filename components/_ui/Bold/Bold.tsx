import classes from './Bold.module.css';

interface Props {
  readonly children: string | JSX.Element|Array<JSX.Element>
}

export default function Bold({children}:Props){

  return <span className={classes.bold}>{children}</span>
}