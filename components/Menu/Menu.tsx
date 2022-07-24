import classes from "./Menu.module.css";
import useIsMobile from "../_hooks/useIsMobile";
import { MenuLinks, MenuLinksInterface } from "./MenuLinks";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { CSSTransition } from "react-transition-group";

interface props {
  readonly setIsOpen: Function;
  readonly isOpen: Boolean;
}

export default function Menu({ setIsOpen, isOpen }: props) {
  const isMobile = useIsMobile(),
    { isReduce, isMobileOpen } = useMemo(
      () => ({
        isReduce: !isOpen && !isMobile,
        isMobileOpen: isMobile ? isOpen : true,
      }),
      [isMobile, isOpen]
    ),
    iconSize = isReduce ? 30 : 20;

  //TODO mettre une css transisiton
  return (
    <CSSTransition
      in={isMobileOpen}
      timeout={300}
      classNames="flap"
      unmountOnExit
      mountOnEnter
    >
      <nav className={classes.container} data-ismobile={isMobile}>
        {MenuLinks.map((link: MenuLinksInterface) => (
          <Link href={link.href} key={link.title} passHref>
            <a className={classes.link} data-reduce={isReduce} onClick={()=>{
                if(isMobile){
                    setIsOpen(false)
                }
            }}>
              <Image
                src={link.icon}
                alt={link.title}
                width={iconSize}
                height={iconSize}
              />
              <div>{link.title}</div>
            </a>
          </Link>
        ))}
      </nav>
    </CSSTransition>
  );
}
