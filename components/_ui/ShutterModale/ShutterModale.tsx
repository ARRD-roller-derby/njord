import { ReactChild, useRef } from "react";
import classes from "./ShutterModale.module.css";
import { CSSTransition } from "react-transition-group";

type ShutterModaleProps = {
  children: ReactChild;
  setClose: Function;
  show: boolean;
  title?: ReactChild;
};

export default function ShutterModaleProps({
  children,
  setClose,
  show,
  title,
}: ShutterModaleProps) {
  const ref = useRef(null);
  return (
    <CSSTransition
      nodeRef={ref}
      in={show}
      timeout={300}
      classNames="shutter"
      unmountOnExit
      mountOnEnter
    >
      <div className={classes.container} ref={ref}>
        <div className={classes.box}>
          <div className={classes.title}>
            <div>{title}</div>
            <div className="close" onClick={() => setClose()} />
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}
