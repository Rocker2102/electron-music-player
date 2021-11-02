import { AppFooterState } from './AppFooterType';

export interface SongInfoAttr {
    name: string,
    other?: string | string[],
    artist?: string | string[],
    picture: null | string,

    height?: AppFooterState['height']
}

interface SongInfoHandlers {

}

export interface SongInfoProps extends SongInfoAttr, SongInfoHandlers {

}

export type SongInfoState = unknown;
