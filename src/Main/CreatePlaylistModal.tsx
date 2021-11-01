import * as React from 'react';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { CreatePlaylistModalProps, CreatePlaylistModalState } from '../types/CreatePlaylistModalType';


/* Code base from https://mui.com/components/modal */

export default class CreatePlaylistModal extends React.Component
    <CreatePlaylistModalProps, CreatePlaylistModalState> {

    state: CreatePlaylistModalState = {
        playlistName: ''
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            playlistName: e.target.value
        });
    }

    savePlaylist = (): void => {
        this.props.handleSave(this.state.playlistName);
        this.setState({
            playlistName: ''
        });
    }

    render(): React.ReactNode {
        return (
            <Dialog
                open={this.props.isOpen} onClose={this.props.handleClose}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Create Playlist
                    </DialogContentText> */}
                    <TextField
                        value={this.state.playlistName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name of new playlist"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>Cancel</Button>
                    <Button onClick={this.savePlaylist}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
