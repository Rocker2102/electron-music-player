declare namespace _MiniDrawer {
    interface props {
        main: JSX.Element,
        themeMode: _App.state['common']['theme'],
        toggleTheme: _Main.props['toggleTheme']
    }

    interface state {
        open: boolean
    }
}
