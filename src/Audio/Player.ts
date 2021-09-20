import { Howl, HowlOptions } from 'howler';

type HandlerFn = () => void;

type HandlerOptions = {
    load?: undefined | HandlerFn,
    loadError?: undefined | HandlerFn,

    play?: undefined | HandlerFn,
    playError?: undefined | HandlerFn,

    end?: undefined | HandlerFn,
    stop?: undefined | HandlerFn,
    pause?: undefined | HandlerFn
}

/**
 * Wrapper class around audio driver (Howler)
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
        if (src === this.src) {
            this.setSeek(0);
            this.play();
            return this.howl;
        }

        this.stop();

        /* remove all listeners */
        this.howl.off();

        /* destroy previous 'howls' */
        this.howl.unload();
        this.src = src;

        console.log(this.options);

        /* start a fresh 'howl' */
        this.howl = new Howl({
            ...this.options,

            src: src,
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

    setLoop = (loop: boolean): Howl => {
        this.options['loop'] = loop;
        return this.howl.loop(loop);
    }

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
        typeof handlers.stop !== 'undefined' ? this.handlers.stop = handlers.stop : false;
        typeof handlers.pause !== 'undefined' ? this.handlers.pause = handlers.pause : false;

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
        typeof this.handlers.stop !== 'undefined'
            ? this.howl.on('stop', this.handlers.stop) : false;
        typeof this.handlers.pause !== 'undefined'
            ? this.howl.on('pause', this.handlers.pause) : false;
    }
}
