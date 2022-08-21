import { ReactChild } from "react";
import classes from "./Anonymous.module.css";

interface props {
  readonly children: ReactChild;
}

export default function AnonymousLayout({ children }: props) {
  return <div className={classes.container}>{children}</div>;
}
