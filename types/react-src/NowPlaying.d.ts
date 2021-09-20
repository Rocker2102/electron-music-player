declare namespace _NowPlaying {
    namespace PlaybackOptions {
        interface props {
            length: number,  /* song duration (in seconds) */
            current: number,  /* current song status (in seconds) */
            shuffle: boolean,
            isPlaying: boolean,
            isLoading?: _NowPlaying.props['isLoading']
            repeatType: 'off' | 'single' | 'on',

            handlePrev: () => void,
            handleNext: () => void,

            handleSeek: (seconds: number) => void,
            toggleRepeat: () => void,
            toggleShuffle: () => void,
            togglePlayback: () => void,
        }

        interface state {
            sliderVal: null | number
        }
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
            handleVolumeUpdate: (e: Event, volume: number | number[]) => void
        }

        type state = unknown;
    }

    interface props {
        isLoading: _App.state['isLoading'],
        songInfo: SongInfo.props,
        playbackOptions: PlaybackOptions.props,
        volumeOptions: VolumeOptions.props
    }

    type state = {
        height?: undefined | number
    };
}
