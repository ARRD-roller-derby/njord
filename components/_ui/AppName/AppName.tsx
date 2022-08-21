import Link from 'next/link'
import classes from './AppName.module.css'

export default function AppName() {
  return (
    <Link href="/" passHref>
      <a className={classes.title} title="retour à l'accueil">
        Njörd
      </a>
    </Link>
  )
}
