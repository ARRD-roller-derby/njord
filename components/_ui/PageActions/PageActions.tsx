import classes from './PageActions.module.css';

interface props {
  readonly children: JSX.Element|Array<JSX.Element>
}
export default function PageActions({children}:props){

  return <div className={classes.container}>
    {children}
  </div>
}