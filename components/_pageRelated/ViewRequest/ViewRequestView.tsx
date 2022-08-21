import dayjs from 'dayjs'
import { answerRequest } from '../../../types/answerRequest.enum'
import { RequestInterface } from '../../../types/Request.interface'
import ErrorMsg from '../../_ui/ErrorMsg/ErrorMsg'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import classes from './ViewRequest.module.css'

interface props {
  readonly request: RequestInterface
  readonly answerPost: Function
  readonly loading: boolean
  readonly error?:string
}

export default function ViewRequestView({ request, answerPost, loading,error }:props) {
  return (
    <div className={classes.container}>
      {request && <div className={classes.box}>
        <div className={classes.date}>{dayjs(request.updatedAt).fromNow()}</div>
        <div className={classes.text}>{request.resume}</div>
        <div className={classes.buttons}>
          <button
            className={classes.refused}
            onClick={() => answerPost(answerRequest.refused)}
          >
            refuser
          </button>
          <button
            className={classes.accept}
            onClick={() => answerPost(answerRequest.accept)}
          >
            Accepter
          </button>
        </div>
      </div>}
      {loading && <LoaderWheel/>}
      {error && <ErrorMsg message={error}/>}
    </div>
  )
}
