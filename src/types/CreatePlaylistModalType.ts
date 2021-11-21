export interface CreatePlaylistModalAttr {
    isOpen: boolean;
}

interface CreatePlaylistModalHandlers {
    handleSave: (name: string) => void;
    handleClose: () => void;
}

export interface CreatePlaylistModalProps
    extends CreatePlaylistModalAttr,
        CreatePlaylistModalHandlers {}

export interface CreatePlaylistModalState {
    playlistName: string;
}
