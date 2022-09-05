import classes from './MenuButton.module.css';

interface props {
  readonly isOpen: boolean
  readonly setIsOpen:Function
}
export default function MenuButton({isOpen,setIsOpen}:props){

  return <div className={classes.container} onClick={()=>setIsOpen()} data-isopen={isOpen}>
    {['NO','NE','SO','SE'].map((o:string)=><div key={o} className={classes.square} data-position={o}/>)}
</div>
}