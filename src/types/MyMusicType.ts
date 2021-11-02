export interface MyMusicAttr {

}

interface MyMusicHandlers {

}

export interface MyMusicProps extends MyMusicAttr, MyMusicHandlers {

}

export interface MyMusicState {
    sortBy: 'name' | 'date' | 'album' | 'artist',
    selectedGenre: string,
    selectFolderAlert: boolean
}
