import ReactMarkdown from 'react-markdown'
import classes from './MiniFormTextRead.module.css'
import validator from 'validator';

interface props {
  readonly value?: string
}

export default function MiniFormTextRead({ value }: props) {
  return (
    <div className={classes.container}>
      {value ? (
        <ReactMarkdown>{validator.unescape(value)}</ReactMarkdown>
      ) : (
        <div className={classes.empty}>{'(vide)'}</div>
      )}
    </div>
  )
}
