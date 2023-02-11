import { ReactChild } from "react";
import { ToastContainer } from "react-toastify";
import classes from "./Anonymous.module.css";

interface props {
  readonly children: ReactChild;
}

export default function AnonymousLayout({ children }: props) {
  return <div className={classes.container}>
    <ToastContainer
      draggablePercent={60}
      position={'top-right'}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    {children}</div>;
}
