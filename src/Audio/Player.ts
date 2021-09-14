import { Howl, HowlOptions } from 'howler';

type HandlerOptions = {
    load?: undefined | (() => void),
    loadError?: undefined | (() => void),

    play?: undefined | (() => void),
    playError?: undefined | (() => void),

    end?: undefined | (() => void)
}

/**
 * Wrapper class aroud audio driver (Howler)
 */
export default class Player {
    private src: string;
    private howl: Howl;
    private options: HowlOptions;
    private volumeSteps = 15;
    private handlers: HandlerOptions = { };

    constructor(src: string, options: HowlOptions) {
        this.src = src;
        this.options = options;

        this.howl = new Howl({
            ...options,

            src: src,
            html5: true,
            autoplay: false
        });
    }

    /* only starts 'howl' if src is different from previous */
    start = (src: string, play = true): Howl => {
        if (src === this.src) { return this.howl }

        /* remove all listeners */
        this.howl.off();

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

        /* re-register the handlers on the new 'howl' instance */
        this.registerHandlers();

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

    /**
     * Use for debug purpose only
     */
    getDriverInstance = (): Howl => {
        return this.howl;
    }

    /**
     * Use for debug purpose only
     */
    getHandlers = (): HandlerOptions => {
        return this.handlers;
    }

    setHandlers = (handlers: HandlerOptions, register = false): void => {
        typeof handlers.load !== 'undefined' ? this.handlers.load = handlers.load : false;
        typeof handlers.loadError !== 'undefined'
            ? this.handlers.loadError = handlers.loadError : false;

        typeof handlers.play !== 'undefined' ? this.handlers.play = handlers.play : false;
        typeof handlers.playError !== 'undefined'
            ? this.handlers.playError = handlers.playError : false;

        typeof handlers.end !== 'undefined' ? this.handlers.end = handlers.end : false;

        register ? this.registerHandlers() : false;
    }

    registerHandlers = (): void => {
        typeof this.handlers.load !== 'undefined'
            ? this.howl.on('load', this.handlers.load) : false;
        typeof this.handlers.loadError !== 'undefined'
            ? this.howl.on('loaderror', this.handlers.loadError) : false;

        typeof this.handlers.play !== 'undefined'
            ? this.howl.on('play', this.handlers.play) : false;
        typeof this.handlers.playError !== 'undefined'
            ? this.howl.on('playerror', this.handlers.playError) : false;

        typeof this.handlers.end !== 'undefined'
            ? this.howl.on('end', this.handlers.end) : false;
    }
}
