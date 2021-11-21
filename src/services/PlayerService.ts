import { Howl, HowlOptions } from 'howler';

type EventTypes = 'load' | 'loadError' | 'play' | 'playError' | 'end' | 'stop' | 'pause';

/**
 * Wrapper class around audio driver (Howler)
 */
export default class Player extends EventTarget {
    private src: string;
    private howl: Howl;
    private options: HowlOptions;
    private volumeSteps = 15;

    /**
     * Contains event definitions
     */
    private events: { [eventType in EventTypes]: Event } = {
        load: new Event('load'),
        loadError: new Event('loadError'),
        play: new Event('play'),
        playError: new Event('playError'),
        end: new Event('end'),
        stop: new Event('stop'),
        pause: new Event('pause')
    };

    constructor(src: string, options: HowlOptions) {
        super();

        this.src = src;
        this.options = options;

        this.howl = new Howl({
            ...options,

            src: src,
            html5: true,
            autoplay: false
        });
    }

    on = (eventType: EventTypes, eventHandler: () => void): void => {
        return this.addEventListener(eventType, eventHandler);
    };

    off = (eventType: EventTypes, eventHandler: () => void): void => {
        return this.removeEventListener(eventType, eventHandler);
    };

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

        /* start a fresh 'howl' */
        this.howl = new Howl({
            ...this.options,

            src: src,
            html5: true,
            autoplay: play
        });

        play ? this.dispatchEvent(this.events.play) : false;
        return this.howl;
    };

    stop = (): Howl => {
        this.dispatchEvent(this.events.stop);
        return this.howl.stop();
    };

    play = (): number => {
        this.dispatchEvent(this.events.play);
        return this.howl.play();
    };

    pause = (): Howl => {
        this.dispatchEvent(this.events.pause);
        return this.howl.pause();
    };

    isPlaying = (): boolean => this.howl.playing();

    getVolume = (): number => this.howl.volume();

    setVolume = (volume: number, fade = true): Howl | number => {
        volume < 0 ? (volume = 0) : false;
        /* eslint-disable-next-line keyword-spacing */
        volume > this.volumeSteps ? (volume = this.volumeSteps) : false;
        this.options['volume'] = volume / this.volumeSteps;

        /* increase/decrease volume smoothly */
        return fade
            ? this.howl.fade(this.howl.volume(), this.options['volume'], 200)
            : this.howl.volume(this.options['volume']);
    };

    mute = (status: boolean): Howl => this.howl.mute(status);

    getSeek = (): number => this.howl.seek();

    setSeek = (seconds: number): Howl | number => this.howl.seek(seconds);

    setLoop = (loop: boolean): Howl => {
        this.options['loop'] = loop;
        return this.howl.loop(loop);
    };

    getDuration = (): number => this.howl.duration();

    state = (): 'unloaded' | 'loading' | 'loaded' => this.howl.state();

    /**
     * Use for debug purpose only
     */
    getDriverInstance = (): Howl => {
        return this.howl;
    };
}
