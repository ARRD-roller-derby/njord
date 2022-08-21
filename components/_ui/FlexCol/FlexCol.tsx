import classes from './FlexCol.module.css';

interface props {
  readonly children: string|JSX.Element|Array<JSX.Element>
  readonly halign?:boolean
}

export default function FlexCol({children,halign}:props){

  return <div className={classes.container} data-halign={halign}>{children}</div>
}