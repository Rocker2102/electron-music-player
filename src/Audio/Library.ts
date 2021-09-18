interface Song extends _App.Library.Song { };

export default class Libary {
    private list!: Song[];
    private currentSongIndex = 0;

    constructor() {

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

    getCurrent = (): Song => {
        return this.list[this.currentSongIndex];
    }

    setSong = (index: number): Song => {
        const listLength = this.list.length;
        if (index < 0) {
            this.currentSongIndex = (listLength - (-(index))) % listLength;
        } else if (index > listLength) {
            this.currentSongIndex = (listLength + index) % listLength;
        } else {
            this.currentSongIndex = index;
        }

        return this.list[this.currentSongIndex];
    }
}
