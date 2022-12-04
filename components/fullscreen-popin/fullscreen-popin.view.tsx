import FullscreenModale from "../_ui/FullscreenModale/FullscreenModale"
import { FullscreenPopinProviderState } from "./fullscreen-popin.context"
import { FullscreenPopinProps } from "./fullscreen-popin.type"

export const FullscreenPopinView: React.FC<
    FullscreenPopinProps & FullscreenPopinProviderState
> = ({ isOpen, close, open, text, children }) => {

    console.log(isOpen)
    return <>
        <button onClick={open}>{text}</button>
        {isOpen && <FullscreenModale setClose={close}>
            <>
                {children}
            </>
        </FullscreenModale>}
    </>
}