import { SongInfoAttr } from './SongInfoType';
import { VolumeOptionsAttr } from './VolumeOptionsType';
import { PlaybackOptionsAttr } from './PlaybackOptionsType';

export interface Common {
    themeMode: 'dark' | 'light',
    background: string
}

export type AppProps = unknown;

export interface AppState {
    common: Common,

    isLoading: boolean,

    songInfo: SongInfoAttr,
    volumeOptions: VolumeOptionsAttr,
    playbackOptions: PlaybackOptionsAttr
}
