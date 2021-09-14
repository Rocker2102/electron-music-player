declare namespace _NowPlaying {
    namespace PlaybackOptions {
        interface props {
            next?: undefined | string,  /* next song path */
            prev?: undefined | string,  /* previous song path */
            length: number,  /* song duration (in seconds) */
            current: number,  /* current song status (in seconds) */
            shuffle: boolean,
            isPlaying: boolean,
            repeatType: 'off' | 'single' | 'on',

            toggleRepeat: () => void,
            toggleShuffle: () => void,
            togglePlayback: () => void,
        }

        type state = unknown;
    }

    namespace SongInfo {
        interface props {
            name: string,
            other?: undefined | string | string[],
            artist?: undefined | string | string[],
            picture: null | string,

            height?: _NowPlaying.state['height']
        }

        type state = unknown;
    }

    namespace VolumeOptions {
        interface props {
            isMute: boolean,
            volume: number,

            toggleMute: () => void,
            handleVolumeUpdate: (e: Event, volume: number | number[],
                activeThumb: number) => void
        }

        type state = unknown;
    }

    interface props {
        songInfo: SongInfo.props,
        playbackOptions: PlaybackOptions.props,
        volumeOptions: VolumeOptions.props
    }

    type state = {
        height?: undefined | number
    };
}
