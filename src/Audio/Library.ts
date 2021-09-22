type Song = _App.Library.Song;
type onLoadHandler = () => void;

/**
 * Responsible for managing current playlist.
 * Contains important methods
 */
export default class Library {
    private list!: Song[];
    private lsKey: string;
    private currentSongIndex = 0;
    private onLoad: onLoadHandler;

    constructor(lsKey: string, onLoad: onLoadHandler) {
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
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    }
}
