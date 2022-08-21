import Image from 'next/image'
import classes from './Avatar.module.css'

interface props {
  readonly size?: number
  readonly src?: string
}

export default function Avatar({
  size = 25,
  src = '/static/images/profile.webp',
}: props) {
  return (
    <div className={classes.avatar}>
      <Image
        src={src}
        width={size}
        height={size}
        alt={'avatar'}
        layout="responsive"
      />
    </div>
  )
}
