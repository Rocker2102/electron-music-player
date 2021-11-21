export interface MyMusicAttr {}

interface MyMusicHandlers {}

export interface MyMusicProps extends MyMusicAttr, MyMusicHandlers {}

export interface MyMusicState {
    tab: 'songs' | 'artists' | 'albums';
    sortBy: 'name' | 'date' | 'album' | 'artist';
    selectedGenre: string;
    selectFolderAlert: boolean;
}
