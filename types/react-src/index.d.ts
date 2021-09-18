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

    namespace Library {
        interface Song {
            src: string,
            name: string,
            year?: number,
            album?: string,
            genre?: string,
            other?: string | string[],
            artist: string | string[],
            length: number
        }
    }
}
