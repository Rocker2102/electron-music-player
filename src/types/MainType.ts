import { Common } from './AppType';

export type ComponentTypes = 'main' | 'recent' | 'nowPlaying' | 'playlists';

export interface MainAttr {
    themeMode: Common['themeMode'];
}

export interface MainHandlers {
    toggleTheme: () => void;
}

export interface MainProps extends MainAttr, MainHandlers {}

export interface MainState {
    appName: string;
    appVersion: string;
    renderComponent: ComponentTypes;
}
