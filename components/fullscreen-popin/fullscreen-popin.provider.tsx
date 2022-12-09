import { ReactNode, useState } from "react"
import { FullscreenPopinContext } from "./fullscreen-popin.context"

type FullscreenPopinProviderProps = {
    children: ReactNode
}

export const FullscreenPopinProvider: React.FC<FullscreenPopinProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const state = {
        isOpen,
        close: () => setIsOpen(false),
        open: () => setIsOpen(true)
    }

    return <FullscreenPopinContext.Provider value={state}>{children}</FullscreenPopinContext.Provider>
}