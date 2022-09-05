import { useState } from "react"

interface Props {
  readonly text: string
  readonly onClick: Function
}

export default function useAutoConfirmButton({text,onClick}:Props){
  const 
    [buttonText, setButtonText] = useState<string>(text),
    [showconfirm,setshowConfirm] = useState<boolean>(false)

  function clickAction(){
    if(buttonText === text){
      setButtonText('annuler')
      setshowConfirm(true)
    }else {
      setButtonText(text)
      setshowConfirm(false)
    }
  }

  function submit(){
    onClick()
    setButtonText(text)
    setshowConfirm(false)
  }
  return {buttonText,clickAction,showconfirm,submit}
}