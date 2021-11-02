import React from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AlertTitle from '@mui/material/AlertTitle';

import CloseIcon from '@mui/icons-material/CloseRounded';
import FolderIcon from '@mui/icons-material/FolderSpecialOutlined';

import type { MyMusicProps, MyMusicState } from '../../types/MyMusicType';


interface SelectFolderAlertProps {
    open: boolean,
    handleClose: () => void
    handleSelect: () => void,
}

const SelectFolderAlert: React.FC<SelectFolderAlertProps> = (props) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
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

export default class MusicMain extends React.Component
    <MyMusicProps, MyMusicState> {

    state = {
        selectFolderAlert: true
    };

    handleSelectFolder = (): void => {
        console.log('Selecting folders..');
    }

    closeSelectFolderAlert = (): void => {
        this.setState({
            selectFolderAlert: false
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
            </Box>
        );
    }
}
