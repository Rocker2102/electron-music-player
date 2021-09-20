type Song = _App.Library.Song;

/**
 * Responsible for managing current playing playlist
 * Contains important methods
 */
export default class Library {
    private list!: Song[];
    private currentSongIndex = 0;

    constructor(songs: Song[]) {
        this.list = songs;
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
