export interface PlaybackOptionsAttr {
    /**
        * song duration (in seconds)
        */
    length: number,

    /**
    * current song status (in seconds)
    */
    current: number,
    shuffle: boolean,
    isPlaying: boolean,
    isLoading?: boolean,
    repeatType: 'off' | 'single' | 'on'
}

interface PlaybackOptionsHandlers {
    handlePrev: () => void,
    handleNext: () => void,

    handleSeek: (seconds: number) => void,
    toggleRepeat: () => void,
    toggleShuffle: () => void,
    togglePlayback: () => void
}

export interface PlaybackOptionsProps extends PlaybackOptionsAttr, PlaybackOptionsHandlers {

}

export interface PlaybackOptionsState {
    sliderVal: null | number
}
