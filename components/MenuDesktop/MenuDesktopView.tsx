import Image from 'next/image'
import Link from 'next/link'
import classes from './MenuDesktop.module.css'
import { MenuLinks, MenuLinksInterface } from '../../datasources/MenuLinks'

interface props {
  readonly iconSize: number
  readonly filter: Function
  readonly pathname: string
}

export default function MenuDesktopView({ iconSize, filter, pathname }: props) {
  return (
    <nav className={classes.container}>
      {MenuLinks.filter((o) => filter(o)).map((link: MenuLinksInterface) => (
        <Link href={link.href} key={link.title} passHref>
          <a
            className={classes.link}
            data-current={
              link.href === '/'
                ? pathname === link.href
                : !!pathname.includes(link.href)
            }
          >
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
  )
}
