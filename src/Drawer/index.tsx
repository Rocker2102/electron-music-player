import React, { ReactNode } from 'react';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AddIcon from '@mui/icons-material/AddRounded';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ScheduleIcon from '@mui/icons-material/ScheduleRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import MusicNoteIcon from '@mui/icons-material/MusicNoteRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusicRounded';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlayRounded';

import CreatePlaylistModal from '../Main/CreatePlaylistModal';

import { MiniDrawerProps, MiniDrawerState } from '../types/MiniDrawerType';


/* Code base from https://mui.com/components/drawers/ */

type MenuItem = {
    name: string,
    icon: JSX.Element,
    link: string
};

const [ drawerWidth, transitionDuration ] = [ 280, 100 ];

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: transitionDuration,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: transitionDuration,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)})`
});

const DrawerHeader = styled('div')(({ theme }) => ({
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([ 'width', 'margin' ], {
        easing: theme.transitions.easing.sharp,
        duration: transitionDuration,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create([ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: transitionDuration,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default class MiniDrawer extends React.PureComponent
    <MiniDrawerProps, MiniDrawerState> {

    private menuItems: MenuItem[] = [
        {
            name: 'My Music',
            icon: <MusicNoteIcon />,
            link: ''
        },
        {
            name: 'Recent Plays',
            icon: <ScheduleIcon />,
            link: ''
        },
        {
            name: 'Now Playing',
            icon: <LibraryMusicIcon />,
            link: ''
        }
    ];

    constructor(props: MiniDrawerProps) {
        super(props);

        this.state = {
            open: true,
            searchText: '',
            isCreatePlaylistModalOpen: false
        };
    }

    toggleDrawerOpen = (): void => {
        this.setState({
            open: !this.state.open
        });
    };

    savePlaylist = (name: string): void => {
        if (name === '') { return }

        console.log('Playlist created', name);
        this.closeCreatePlaylistModal();
    }

    openCreatePlaylistModal = (): void => {
        this.setState({
            isCreatePlaylistModalOpen: true
        });
    }

    closeCreatePlaylistModal = (): void => {
        this.setState({
            isCreatePlaylistModalOpen: false
        });
    }

    handleSearchSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (this.state.searchText === '') { return }

        console.log('Searching...', this.state.searchText);
    }

    handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            searchText: e.target.value
        });
    }

    render (): ReactNode {
        return <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <CreatePlaylistModal isOpen={this.state.isCreatePlaylistModalOpen}
                handleSave={this.savePlaylist}
                handleClose={this.closeCreatePlaylistModal}
            />

            <AppBar position="fixed" open={this.state.open}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={this.toggleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" ml={2} noWrap component="div">
                            App Name
                        </Typography>
                    </Box>

                    <IconButton
                        color="inherit"
                        onClick={this.props.toggleTheme}
                    >
                        {this.props.themeMode === 'dark'
                            ? <Brightness7Icon />
                            : <Brightness4Icon />
                        }

                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={this.state.open}>
                <DrawerHeader>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowBackIcon />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </DrawerHeader>

                <Divider />

                <List>
                    <ListItem button disableRipple>
                        <ListItemIcon
                            sx={{ display: this.state.open ? 'none' : 'inline-flex' }}
                            onClick={this.toggleDrawerOpen}
                        >
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText disableTypography primary={
                            <form onSubmit={this.handleSearchSubmit}>
                                <TextField
                                    value={this.state.searchText}
                                    label="Search" variant="outlined"
                                    size="small" fullWidth
                                    color="warning"
                                    onChange={this.handleSearchTextChange}
                                />
                            </form>
                        } />
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {this.menuItems.map(({ name, icon, link }) => (
                        <ListItem button key={name}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>

                <Divider />

                <List>
                    <ListItem button secondaryAction={
                        <IconButton edge="end" aria-label="delete"
                            sx={{ display: this.state.open ? 'inline-flex' : 'none' }}
                            onClick={this.openCreatePlaylistModal}
                            disableRipple
                        >
                            <AddIcon />
                        </IconButton>
                    }>
                        <ListItemIcon>
                            <PlaylistPlayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Playlists" />
                    </ListItem>

                    <ListItem button sx={{ display: this.state.open ? 'none' : 'flex' }}
                        onClick={this.openCreatePlaylistModal}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="" />
                    </ListItem>
                </List>

            </Drawer>

            <Box component="main" sx={{ flexGrow: 1 }}>
               {this.props.children}
            </Box>
        </Box>;
    }
}
