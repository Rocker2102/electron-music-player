import React, { ReactNode } from 'react';

import Shuffle from '@mui/icons-material/ShuffleRounded';
import RepeatOne from '@mui/icons-material/RepeatOneRounded';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import SkipNext from '@mui/icons-material/SkipNextRounded';
import SkipPrevious from '@mui/icons-material/SkipPreviousRounded';

import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


export default class PlaybackOptions extends React.PureComponent
    <unknown, unknown> {

    render(): ReactNode {
        return <Grid item xs={5} sm={4} >
            <Grid container >
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <IconButton color="primary" sx={{
                        display: { xs: 'none', md: 'inline-flex' } }} >
                        <Shuffle fontSize="medium" />
                    </IconButton>
                    <IconButton color="primary">
                        <SkipPrevious fontSize="medium" />
                    </IconButton>
                    <IconButton color="primary" size="large">
                        <PlayArrow fontSize="large" />
                    </IconButton>
                    <IconButton color="primary" size="large">
                        <SkipNext fontSize="medium" />
                    </IconButton>
                    <IconButton color="primary" sx={{
                        display: { xs: 'none', sm: 'inline-flex' } }}>
                        <RepeatOne fontSize="medium" />
                    </IconButton>
                </Grid>

                <Grid item xs={12} mx={4} sx={{ display: 'flex',
                    justifyContent: 'center', alignItems: 'center' }}
                >
                    <Slider size='small' defaultValue={30} min={0} max={100} />
                </Grid>

                <Grid item xs={12} mx={4} mt={-1} sx={{ display: 'flex',
                    alignItems: 'flex-start', justifyContent: 'space-between' }}
                >
                    <Typography variant="subtitle2" color="text.secondary">0:00</Typography>
                    <Typography variant="subtitle2" color="text.secondary">0:00</Typography>
                </Grid>
            </Grid>
        </Grid>;
    }
}
