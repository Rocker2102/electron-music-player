declare namespace _MiniDrawer {
    interface props {
        themeMode: _App.state['common']['theme'],
        toggleTheme: _Main.props['toggleTheme']
    }

    interface state {
        open: boolean,
        searchText: string,
        isCreatePlaylistModalOpen: boolean
    }
}
