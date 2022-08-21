import classes from './GoBack.module.css';
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react';
import AppName from '../_ui/AppName/AppName';
import ArrowLeftThin from '../../public/icons/arrow-left-thin.svg';
import Image from 'next/image';

interface props {
  readonly isHome:boolean
  readonly isMobile: boolean
  readonly goBack: Function
  readonly currentPage:string
}
export default function GoBackView({isHome,goBack,currentPage}:props){
  const ref = useRef(null);

  return <>
    {isHome  && <AppName/>}
     <CSSTransition
      nodeRef={ref}
      in={!isHome}
      timeout={300}
      classNames="shutter"
      unmountOnExit
      mountOnEnter
    >
      <div className={classes.link}>
       <Image src={ArrowLeftThin} width={20} height={20}  alt="flêche"/>
        <div onClick={()=>goBack()}>{currentPage}</div>
      </div>
    </CSSTransition>
  
  </>
}