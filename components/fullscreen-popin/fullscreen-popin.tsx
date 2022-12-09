
import Factory from "../_layouts/Factory/Factory"
import { FullscreenPopinProviderState } from "./fullscreen-popin.context"
import { useFullscreenPopin } from "./fullscreen-popin.hook"
import { FullscreenPopinProvider } from "./fullscreen-popin.provider"
import { FullscreenPopinProps } from "./fullscreen-popin.type"
import { FullscreenPopinView } from "./fullscreen-popin.view"

const FullscreenPopinFactory = Factory<
    FullscreenPopinProps,
    FullscreenPopinProviderState>(useFullscreenPopin, FullscreenPopinView)

export const FullscreenPopin: React.FC<FullscreenPopinProps> =
    (props) => <FullscreenPopinProvider><FullscreenPopinFactory {...props} /></FullscreenPopinProvider>