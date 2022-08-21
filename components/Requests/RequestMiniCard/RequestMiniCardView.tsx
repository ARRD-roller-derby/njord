import classes from './RequestMiniCard.module.css'
import dayjs from 'dayjs'
import { RequestInterface } from '../../../types/Request.interface'
import { answerRequest } from '../../../types/answerRequest.enum'

interface props {
  readonly request: RequestInterface
  readonly answerPost: Function
  readonly loading: boolean
}

export default function RequestMiniCardView({ request, answerPost,loading}: props) {
  return (
    <div className={classes.container}>
      <div className={classes.date}>{dayjs(request.updatedAt).fromNow()}</div>
      <div className={classes.text}>{request.resume}</div>

      <div className={classes.buttons}>
        <button
          disabled={loading}
          className={classes.refused}
          onClick={() => answerPost(answerRequest.refused)}
        >
          refuser
        </button>
        <button
          disabled={loading}
          className={classes.accept}
          onClick={() => answerPost(answerRequest.accept)}
        >
          Accepter
        </button>
      </div>
    </div>
  )
}
