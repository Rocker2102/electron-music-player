import { Common } from './AppType';
import { ComponentTypes, MainHandlers } from './MainType';

export interface MiniDrawerAttr {
    themeMode: Common['themeMode']
}

interface MiniDrawerHandlers {
    toggleTheme: MainHandlers['toggleTheme']
    switchComponent: (component: ComponentTypes) => void
    currentComponent: ComponentTypes
}

export interface MiniDrawerProps extends MiniDrawerAttr, MiniDrawerHandlers {

}

export interface MiniDrawerState {
    open: boolean,
    searchText: string,
    isCreatePlaylistModalOpen: boolean
}
