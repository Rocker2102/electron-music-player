import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


type SongInfoProps = {
    albumArt: null | string,
    height: null | number
};

export default class SongInfo extends React.PureComponent
    <SongInfoProps, unknown> {

    constructor(props: SongInfoProps) {
        super(props);
    }

    render(): ReactNode {
        return <Grid item xs={4} zeroMinWidth>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>

                <Box
                    display={{ xs: 'none', md: 'flex' }}
                    sx={{ height: `${this.props.height}px`, width: `${this.props.height}px`,
                        overflow: 'hidden',
                        justifyContent: 'center', alignItems: 'center',
                        flex: '0 0 auto',
                        backgroundImage:
                            `url(${this.props.albumArt === null ? '' : this.props.albumArt})`,
                        backgroundPosition: 'center top', backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover' }}
                >
                    {
                        this.props.albumArt === null
                            ? <CircularProgress color="secondary" />
                            : null
                    }
                </Box>

                <Box ml={1} sx={{ maxWidth: 'inherit',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    <Typography variant="h6" letterSpacing={-0.25}>Song Name (maybe large,
                        therefore truncated)</Typography>
                    <Typography variant="subtitle2" color="text.secondary">Other displayable
                        info (optional)</Typography>
                    <Typography variant="subtitle1">Song Artist probably
                        long</Typography>
                </Box>
            </Box>
        </Grid>;
    }
}
