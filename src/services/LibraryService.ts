import type { Song } from '../types/LibraryType';

type onLoadHandler = () => void;

/**
 * Responsible for managing current playlist.
 * Contains important methods
 */
export default class Library extends EventTarget {
    private list!: Song[];
    private lsKey: string;
    private currentSongIndex = 0;
    private onLoad: onLoadHandler;

    /**
     * Contains event definitions
     */
    private events: { [name: string]: Event } = {
        load: new Event('load'),
        error: new Event('error'),
        localSave: new Event('localSave'),
        localRestore: new Event('localRestore')
    }

    constructor(lsKey: string, onLoad: onLoadHandler) {
        super();
        this.lsKey = lsKey;
        this.onLoad = onLoad;
    }

    loaded = (): void => {
        this.onLoad();
    }

    setList = (songs: Song[]): void => {
        if (songs.length === 0) { return }

        this.list = songs;
        this.saveToLs(this.lsKey);
        this.loaded();
        this.dispatchEvent(this.events.load);
    }

    currentList = (): Song[] => {
        return this.list;
    }

    getCurrent = (): Song => {
        return this.list[this.currentSongIndex];
    }

    getRandom = (): Song => {
        const random = Math.floor(Math.random() * 100) % this.list.length;
        return this.setSong(random);
    }

    next = (): Song => {
       return this.setSong(this.currentSongIndex + 1);
    }

    hasNext = (): boolean => {
        return this.currentSongIndex < this.list.length;
    }

    previous = (): Song => {
        return this.setSong(this.currentSongIndex - 1);
    }

    hasPrevious = (): boolean => {
        return this.currentSongIndex > 0;
    }

    setSong = (index: number): Song => {
        const listLength = this.list.length;

        if (index < 0) {
            this.currentSongIndex = (listLength - (-(index))) % listLength;
        } else if (index >= listLength) {
            this.currentSongIndex = (listLength + index) % listLength;
        } else {
            this.currentSongIndex = index;
        }

        this.saveToLs(this.lsKey);

        return this.list[this.currentSongIndex];
    }

    saveToLs = (key: string): void => {
        if (this.currentList().length === 0) { return }

        window.localStorage.setItem(key, JSON.stringify({
            song: this.currentSongIndex,
            list: this.currentList()
        }));

        this.dispatchEvent(this.events.localSave);
    }

    restoreFromLs = (key: string): boolean => {
        let local: {
            song: number,
            list: Song[]
        };

        try {
            const tmp = window.localStorage.getItem(key);

            if (tmp === null || tmp === '') {
                throw new Error('Failed to load library from localStorage');
            }

            local = JSON.parse(tmp);

            this.list = local.list;
            this.setSong(local.song);
            this.loaded();
            this.dispatchEvent(this.events.localRestore);
        } catch (e) {
            console.log(e);
            this.dispatchEvent(this.events.error);
            return false;
        }

        return true;
    }
}
