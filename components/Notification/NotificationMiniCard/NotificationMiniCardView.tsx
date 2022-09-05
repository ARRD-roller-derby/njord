import { NotificationInterface } from '../../../types/notification.interface'
import classes from './NotificationMiniCard.module.css'
import dayjs from 'dayjs'
import Cross from '../../../public/icons/xmark.svg'
import Image from 'next/image'

interface props {
  readonly notification: NotificationInterface
  readonly del: Function
  readonly seePage: Function
  readonly loading: boolean
}

export default function NotificationMiniCardView({
  notification,
  del,
  seePage,
  loading
}: props) {
  return (
    <div
      className={classes.container}
      data-loading={loading}
      data-read={notification.state === 'read'}
    >
      <div className={classes.delete} onClick={() => del()}>
        <Image src={Cross} width={10} height={10} alt="supprimer" />
      </div>
      <div className={classes.text} onClick={() => seePage()}>
        {notification.text}
      </div>

      <div className={classes.date}>
        {dayjs(notification.updatedAt).fromNow()}
      </div>
    </div>
  )
}
