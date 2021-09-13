import type { _NowPlaying } from "./NowPlaying";

export declare namespace _App {
    type props = unknown;

    interface state {
        songInfo: _NowPlaying.SongInfo,
        volumeOptions: _NowPlaying.VolumeOptions,
        playbackOptions: _NowPlaying.PlaybackOptions
    }
}
