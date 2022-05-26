import { ReactChild } from "react";
import { ToastContainer } from "react-toastify";
import classes from './Anonymous.module.css';

interface props {
  readonly children: ReactChild
}

export default function AnonymousLayout({children}:props){

  return <div className={classes.container}>
    {children}
    <ToastContainer
        position="top-right"
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
  </div>
}