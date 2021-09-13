export namespace _Main {
    type props = unknown;
    type state = unknown;
}

export namespace _NowPlaying {
    export namespace PlaybackOptions {
        interface props {
            next: string,  /* next song path */
            prev: string,  /* previous song path */
            length: number,  /* song duration (in seconds) */
            current: number,  /* current song status (in seconds) */
            shuffle: boolean,
            isPlaying: boolean,
            repeatType: 'off' | 'single' | 'on'
        };
        type state = unknown;
    }

    export namespace SongInfo {
        interface props {
            name: string,
            other?: string | string[],
            artist?: string | string[],
            picture: null | string,

            height?: _NowPlaying.props['height']
        };
        type state = unknown;
    }

    export namespace VolumeOptions {
        interface props {
            isMute: boolean,
            volume: number
        };
        type state = unknown;
    }

    interface props {
        height?: number
        songInfo: SongInfo.props,
        playbackOptions: PlaybackOptions.props,
        volumeOptions: VolumeOptions.props
    }
    type state = unknown;
}
