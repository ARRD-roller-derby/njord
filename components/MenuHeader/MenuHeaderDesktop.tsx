import classes from "./MenuHeader.module.css";
import Avatar from "../Avatar/Avatar";
import { menuLinks } from "./menuLinks";
import Link from "next/link";
import Wallet from "../Wallet/Wallet";

export default function MenuHeaderDesktop() {
  return (
    <div className={classes.containerDesktop}>
      <Avatar />
      <Wallet/>
      {menuLinks.map((link) => (
        <Link key={link.title} href={link.href}>
          <a className={classes.link}>{link.title}</a>
        </Link>
      ))}
    </div>
  );
}
