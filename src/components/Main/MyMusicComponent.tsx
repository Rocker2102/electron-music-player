import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import CloseIcon from '@mui/icons-material/CloseRounded';
import FolderIcon from '@mui/icons-material/FolderSpecialOutlined';
import ShuffleIcon from '@mui/icons-material/ShuffleRounded';

import type { MyMusicProps, MyMusicState } from '../../types/MyMusicType';


interface SelectFolderAlertProps {
    open: boolean,
    handleClose: () => void
    handleSelect: () => void,
}

const SelectFolderAlert: React.FC<SelectFolderAlertProps> = (props) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2} mb={2}>
            <Collapse in={props.open}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.handleClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>
                        Don&#39;t see all your music?
                    </AlertTitle>

                    <span onClick={props.handleSelect} style={{ cursor: 'pointer' }}>
                        Select folders in which to look &nbsp;
                    </span>

                    <IconButton color="inherit" onClick={props.handleSelect}>
                        <FolderIcon fontSize="inherit" />
                    </IconButton>
                </Alert>
            </Collapse>
        </Stack>
    );
};

interface ComponentHeaderProps {
    genre: MyMusicState['selectedGenre'],
    sortBy: MyMusicState['sortBy'],
    onSortChange: (e: SelectChangeEvent) => void
    onGenreChange: (e: SelectChangeEvent) => void
}

const ComponentHeader: React.FC<ComponentHeaderProps> = (props) => {
    const formControlSx = { mr: 1 };

    return (
        <div>
            <FormControl sx={formControlSx}>
                <InputLabel id="sort-mymusic-label">Sort by</InputLabel>
                <Select
                    id="sort-mymusic-input"
                    size="small"
                    value={props.sortBy}
                    label="Sort by"
                    labelId="sort-mymusic-label"
                    onChange={props.onSortChange}
                >
                    <MenuItem value="name">A - Z</MenuItem>
                    <MenuItem value="date">Date Added</MenuItem>
                    <MenuItem value="artist">Artist</MenuItem>
                    <MenuItem value="album">Album</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={formControlSx}>
                <InputLabel id="genre-mymusic-label">Genre</InputLabel>
                <Select
                    id="genre-mymusic-input"
                    size="small"
                    value={props.genre}
                    label="Genre"
                    labelId="genre-mymusic-label"
                    onChange={props.onSortChange}
                >
                    <MenuItem value="all" selected>All Genres</MenuItem>
                </Select>
            </FormControl>

            <Tooltip title="Shuffle All" placement="right">
                <IconButton sx={formControlSx}>
                    <ShuffleIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default class MusicMain extends React.Component
    <MyMusicProps, MyMusicState> {

    state: MyMusicState = {
        tab: 'songs',
        sortBy: 'name',
        selectedGenre: 'all',
        selectFolderAlert: true
    };

    handleTabChange = (event: React.SyntheticEvent, value: string): void => {
        this.setState({
            tab: value as MyMusicState['tab']
        });
    }

    handleSelectFolder = (): void => {
        console.log('Selecting folders..');
    }

    closeSelectFolderAlert = (): void => {
        this.setState({
            selectFolderAlert: false
        });
    }

    handleSortChange = (e: SelectChangeEvent): void => {
        this.setState({
            sortBy: e.target.value as MyMusicState['sortBy']
        });
    }

    handleGenreChange = (e: SelectChangeEvent): void => {
        this.setState({
            selectedGenre: e.target.value as MyMusicState['selectedGenre']
        });
    }

    render (): React.ReactNode {
        return (
            <Box mt={1} mx={1}>
                <SelectFolderAlert
                    open={this.state.selectFolderAlert}
                    handleClose={this.closeSelectFolderAlert}
                    handleSelect={this.handleSelectFolder}
                />

                <ComponentHeader
                    genre={this.state.selectedGenre}
                    sortBy={this.state.sortBy}
                    onSortChange={this.handleSortChange}
                    onGenreChange={this.handleGenreChange}
                />

                <Divider sx={{ mt: 2 }} />

                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Songs" value="songs" />
                    <Tab label="Artists" value="artists" />
                    <Tab label="Albums" value="albums" />
                </Tabs>
            </Box>
        );
    }
}
