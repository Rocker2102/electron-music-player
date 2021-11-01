import { NowPlayingState } from './NowPlayingType';

export interface SongInfoAttr {
    name: string,
    other?: string | string[],
    artist?: string | string[],
    picture: null | string,

    height?: NowPlayingState['height']
}

interface SongInfoHandlers {

}

export interface SongInfoProps extends SongInfoAttr, SongInfoHandlers {

}

export type SongInfoState = unknown;
