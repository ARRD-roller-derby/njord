import ShortActionView from "./ShortActionView"
import useShortAction from "./useShortAction"


interface Props {
  readonly url: string
  readonly reSync: Function
  readonly text:string
}

export default function MarkAllRead({url,reSync,text}:Props){
  const props = useShortAction(url,reSync)  

  return <ShortActionView {...props} text={text}/>
}