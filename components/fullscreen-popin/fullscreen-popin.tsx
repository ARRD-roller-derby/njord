import { ReactNode, useContext, useState, createContext } from "react"
import Factory from "../_layouts/Factory/Factory"
import FullscreenModale from "../_ui/FullscreenModale/FullscreenModale"

//TYPE
export type FullscreenPopinProps = {
  text: string,
  children: ReactNode
}

type FullscreenPopinProviderProps = {
  children: ReactNode
}

export type FullscreenPopinProviderState = {
  isOpen: boolean,
  close: () => void,
  open: () => void
}


//CONTEXT
export const FullscreenPopinContext = createContext<FullscreenPopinProviderState>(null);

//HOOK
export const useFullscreenPopin = () => {
  const state = useContext(FullscreenPopinContext)
  return state
}

//VIEW
export const FullscreenPopinView: React.FC<
  FullscreenPopinProps & FullscreenPopinProviderState
> = ({ isOpen, close, open, text, children }) => (
  <>
    <button onClick={open}>{text}</button>
    {isOpen && <FullscreenModale setClose={close}>
      <>
        {children}
      </>
    </FullscreenModale>}
  </>
)

//PROVIDER
export const FullscreenPopinProvider: React.FC<FullscreenPopinProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const state = {
    isOpen,
    close: () => setIsOpen(false),
    open: () => setIsOpen(true)
  }

  return <FullscreenPopinContext.Provider value={state}>{children}</FullscreenPopinContext.Provider>
}

//COMPONENT
const FullscreenPopinFactory = Factory<
  FullscreenPopinProps,
  FullscreenPopinProviderState>(useFullscreenPopin, FullscreenPopinView)


export const FullscreenPopin: React.FC<FullscreenPopinProps> =
  (props) => <FullscreenPopinProvider><FullscreenPopinFactory {...props} /></FullscreenPopinProvider>