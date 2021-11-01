import { Common } from './AppType';
import { MainHandlers } from './MainType';

export interface MiniDrawerAttr {
    themeMode: Common['themeMode']
}

interface MiniDrawerHandlers {
    toggleTheme: MainHandlers['toggleTheme']
}

export interface MiniDrawerProps extends MiniDrawerAttr, MiniDrawerHandlers {

}

export interface MiniDrawerState {
    open: boolean,
    searchText: string,
    isCreatePlaylistModalOpen: boolean
}
