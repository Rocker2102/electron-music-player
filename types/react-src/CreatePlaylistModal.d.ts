declare namespace _CreatePlaylistModal {
    interface props {
        isOpen: boolean,
        handleSave: (name: string) => void
        handleClose: () => void
    }

    interface state {
        playlistName: string
    }
}
