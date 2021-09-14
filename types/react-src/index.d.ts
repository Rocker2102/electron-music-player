// <reference path="./Main.d.ts" />
// <reference path="./NowPlaying.d.ts" />

declare namespace _App {
    type props = unknown;

    type state = {
        isLoading: boolean,
        songInfo: _NowPlaying.SongInfo.props,
        volumeOptions: _NowPlaying.VolumeOptions.props,
        playbackOptions: _NowPlaying.PlaybackOptions.props
    }
}
