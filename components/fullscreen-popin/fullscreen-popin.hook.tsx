import { useContext } from "react"
import { FullscreenPopinContext } from "./fullscreen-popin.context"

export const useFullscreenPopin = () => {
    const state = useContext(FullscreenPopinContext)
    return state
}