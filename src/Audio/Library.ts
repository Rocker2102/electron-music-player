type Song = _App.Library.Song;
type onLoadHandler = () => void;

/**
 * Responsible for managing current playing playlist
 * Contains important methods
 */
export default class Library {
    private list!: Song[];
    private currentSongIndex = 0;
    private onLoad: onLoadHandler;

    constructor(onLoad: onLoadHandler) {
        this.onLoad = onLoad;
    }

    loaded = (): void => {
        this.onLoad();
    }

    setList = (songs: Song[]): void => {
        if (songs.length === 0) { return }

        this.list = songs;
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

        return this.list[this.currentSongIndex];
    }
}
