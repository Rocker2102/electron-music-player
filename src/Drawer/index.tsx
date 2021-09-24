import * as React from 'react';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
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
import LibraryMusicIcon from '@mui/icons-material/LibraryMusicRounded';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlayRounded';


/* Code base from https://mui.com/components/drawers/ */

type MenuItem = {
    name: string,
    icon: JSX.Element,
    link: string
};

type MenuItems = MenuItem[];

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
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
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create([ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
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

export default function MiniDrawer() {
    const theme = useTheme();
    const [ open, setOpen ] = React.useState(false);
    const menuItems: MenuItems = [
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

    const toggleDrawerOpen = (): void => {
        setOpen(! open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={toggleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" ml={2} noWrap component="div">
                        App Name
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
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
                        <ListItemIcon sx={{ display: open ? 'none' : 'inline-flex' }}>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText disableTypography primary={
                            <TextField label="Search" variant="outlined"
                                size="small" fullWidth
                                color="secondary"
                            />
                        } />
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {menuItems.map(({ name, icon, link }) => (
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
                            sx={{ display: open ? 'inline-flex' : 'none' }}
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

                    <ListItem button sx={{ display: open ? 'none' : 'flex' }}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="" />
                    </ListItem>
                </List>

            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* <DrawerHeader /> */}


            </Box>
        </Box>
    );
}
