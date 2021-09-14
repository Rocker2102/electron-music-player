import React, { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { formatString } from '../Utils';


export default class SongInfo extends React.PureComponent
    <_NowPlaying.SongInfo.props, _NowPlaying.SongInfo.state> {

    constructor(props: _NowPlaying.SongInfo.props) {
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
                            `url(${this.props.picture === null ? '' : this.props.picture})`,
                        backgroundPosition: 'center top', backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover' }}
                >
                    {
                        this.props.picture === null
                            ? <CircularProgress color="secondary" />
                            : null
                    }
                </Box>

                <Box ml={1} sx={{ maxWidth: 'inherit',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    <Typography variant="h6" letterSpacing={-0.25}>{this.props.name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {formatString(this.props.other)}</Typography>
                    <Typography variant="subtitle1">{formatString(this.props.artist)}</Typography>
                </Box>
            </Box>
        </Grid>;
    }
}
