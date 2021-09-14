import { Howl, HowlOptions } from 'howler';

export default class Player {
    private src: string;
    private howl: Howl;
    private options: HowlOptions;
    private volumeSteps = 15;

    constructor(src: string, options: HowlOptions) {
        this.src = src;
        this.options = options;

        this.howl = new Howl({
            src: src,
            loop: options.loop ?? false,
            html5: true,
            autoplay: options.autoplay ?? false
        });
    }

    /* only starts 'howl' if src is different from previous */
    start = (src: string, play = true): Howl => {
        if (src === this.src) { return this.howl }

        /* destroy previous 'howls' */
        this.howl.unload();
        this.src = src;

        /* start a fresh 'howl' */
        this.howl = new Howl({
            src: src,
            loop: this.options.loop ?? false,
            html5: true,
            autoplay: play
        });

        return this.howl;
    }

    stop = (): Howl => this.howl.stop()

    play = (): number => this.howl.play()

    pause = (): Howl => this.howl.pause()

    isPlaying = (): boolean => this.howl.playing()

    getVolume = (): number => this.howl.volume()

    setVolume = (volume: number): Howl | number => {
        volume < 0 ? volume = 0 : false;
        /* eslint-disable-next-line keyword-spacing */
        volume > this.volumeSteps ? volume = this.volumeSteps : false;
        volume = (volume / this.volumeSteps);

        /* increase/decrease volume smoothly */
        return this.howl.fade(this.howl.volume(), volume, 200);
    }

    mute = (status: boolean): Howl => this.howl.mute(status)

    getSeek = (): number => this.howl.seek()

    setSeek = (seconds: number): Howl | number => this.howl.seek(seconds)

    setLoop = (loop: boolean): Howl => this.howl.loop(loop)

    getDuration = (): number => this.howl.duration()

    state = (): 'unloaded' | 'loading' | 'loaded' => this.howl.state()
}
