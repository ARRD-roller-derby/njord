import MyAvatarWithPopin from '../Me/MyAvatarWithPopin/MyAvatarWithPopin'
import AppName from '../_ui/AppName/AppName'
import Wallet from '../Wallet/Wallet'
import classes from './Header.module.css'
import NotificationBell from '../Notification/NotificationBell/NotificationBell';
import GoBack from '../GoBack/GoBack';


export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.appName}>
        <GoBack />
      </div>
      <div className={classes.appName}>
        <Wallet />
        <NotificationBell />
        <MyAvatarWithPopin />
      </div>
    </header>
  )
}
