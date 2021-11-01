import { AppState, Common } from './AppType';
import { SongInfoProps } from './SongInfoType';
import { VolumeOptionsProps } from './VolumeOptionsType';
import { PlaybackOptionsProps } from './PlaybackOptionsType';

export interface NowPlayingProps {
    isLoading: AppState['isLoading'],
    background: Common['background'],

    songInfo: SongInfoProps,
    playbackOptions: PlaybackOptionsProps,
    volumeOptions: VolumeOptionsProps
}

export interface NowPlayingState {
    height?: number
}
