import Image from 'next/image'
import classes from './NotificationBell.module.css'
import { useRef } from 'react'
import NotificationIndicator from '../NotificationIndicator/NotificationIndicator'
import Link from 'next/link'

interface props {
  readonly active: boolean
}

export default function NotificationBellView({ active }: props) {
  const ref = useRef(null)

  return (
    <Link href="/notifications" passHref>
      <a className={classes.container} ref={ref} data-active={active}>
        <Image
          src="/icons/bell.svg"
          alt={'clôche'}
          width={20}
          className={classes.bell}
          height={20}
        />
        <NotificationIndicator />
      </a>
    </Link>
  )
}
