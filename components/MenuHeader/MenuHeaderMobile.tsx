import classes from './MenuHeader.module.css';
import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { menuLinks } from './menuLinks';
import Link from 'next/link';
import Wallet from '../Wallet/Wallet';

export default function MenuHeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes.containerMobile}>
      <div className={classes.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {Array(1, 2, 3)
          .fill(1, 3)
          .map((bar: number) => (
            <div className={classes.bar} key={bar} />
          ))}
      </div>

      <div className={classes.menuMobile} data-isopen={isOpen}>
        <div className={classes.containerLogin}>
          <Avatar />
          <Wallet/>
        </div>
        <div className={classes.linksMobile}>
          {menuLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <a onClick={() => setIsOpen(false)}>{link.title}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
