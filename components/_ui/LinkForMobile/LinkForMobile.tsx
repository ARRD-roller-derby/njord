import Image from 'next/image'
import classes from './LinkForMobile.module.css'

interface props {
  readonly goToPage: Function
  readonly url: string
  readonly icon: string
  readonly label: string
}

export default function LinkForMobile({ url, goToPage, icon, label }: props) {
  return (
    <div className={classes.link} onClick={()=>goToPage(url)}>
      <Image
        src={icon}
        width={20}
        height={20}
        alt={label}
        className={classes.icon}
      />
      <div className={classes.label}>{label}</div>
    </div>
  )
}
