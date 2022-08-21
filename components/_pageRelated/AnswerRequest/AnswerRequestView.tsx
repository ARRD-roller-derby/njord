
import Link from 'next/link'
import ErrorMsg from '../../_ui/ErrorMsg/ErrorMsg'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import classes from './AnswerRequest.module.css'

interface props {
  readonly message?: string
  readonly loading: boolean
  readonly error?: string
}

export default function AnswerRequestView({ message, loading, error }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {message && <p>{message}</p> }
        {error && <ErrorMsg message={error} />}
        {loading && <LoaderWheel />}
        <Link href="/" passHref>
        <button>Retour à la page {"d'accueil"}</button>
        </Link>

      </div>
     
      
    </div>
  )
}
