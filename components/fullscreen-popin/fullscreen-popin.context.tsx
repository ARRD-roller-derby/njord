import { createContext } from 'react';
export type FullscreenPopinProviderState = {
    isOpen: boolean,
    close: () => void,
    open: () => void
}

export const FullscreenPopinContext = createContext<FullscreenPopinProviderState>(null);