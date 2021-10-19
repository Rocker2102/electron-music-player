import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


/* Code base from https://mui.com/components/modal */

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default class CreatePlaylistModal extends React.Component
    <_CreatePlaylistModal.props, _CreatePlaylistModal.state> {

    constructor(props: _CreatePlaylistModal.props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                <Fade in={this.state.open}>
                    <Dialog
                        open={this.state.open} onClose={this.handleClose}
                        BackdropComponent={Backdrop}
                        BackdropProps={{ timeout: 500 }}
                    >
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Create Playlist
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name of new playlist"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.props.onSave}>Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </Fade>
            </div>
        );
    }
}
