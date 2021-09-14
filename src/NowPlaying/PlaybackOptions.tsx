import React, { ReactElement, ReactNode } from 'react';

import Shuffle from '@mui/icons-material/ShuffleRounded';
import ShuffleOn from '@mui/icons-material/ShuffleOnRounded';
import Repeat from '@mui/icons-material/RepeatRounded';
import RepeatOn from '@mui/icons-material/RepeatOnRounded';
import RepeatOne from '@mui/icons-material/RepeatOneRounded';
import Pause from '@mui/icons-material/PauseRounded';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import SkipNext from '@mui/icons-material/SkipNextRounded';
import SkipPrevious from '@mui/icons-material/SkipPreviousRounded';

import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


function RepeatButton(props: _NowPlaying.PlaybackOptions.props['repeatType'])
    : ReactElement<any, any> {

    let icon: ReactElement, title = 'Repeat: ';

    switch (props) {
        case 'off':
            icon = <Repeat fontSize="medium" />;
            title += 'Off';
            break;
        case 'single':
            icon = <RepeatOne fontSize="medium" />;
            title += 'Single';
            break;
        case 'on':
            icon = <RepeatOn fontSize="medium" />;
            title += 'On';
            break;
    }

    return <Tooltip title={title} placement="right">
        {icon}
    </Tooltip>;
}

export default class PlaybackOptions extends React.PureComponent
    <_NowPlaying.PlaybackOptions.props, unknown> {

    constructor(props: _NowPlaying.PlaybackOptions.props) {
        super(props);
    }

    render(): ReactNode {
        return <Grid item xs={5} sm={4} >
            <Grid container >
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <IconButton color="primary" sx={{
                        display: { xs: 'none', md: 'inline-flex' } }}
                        onClick={this.props.toggleShuffle}
                    >
                        {
                            this.props.shuffle
                                ? <ShuffleOn fontSize="medium" />
                                : <Shuffle fontSize="medium" />
                        }
                    </IconButton>

                    <IconButton color="primary">
                        <SkipPrevious fontSize="medium" />
                    </IconButton>

                    <IconButton color="primary" size="large"
                        onClick={this.props.togglePlayback}
                    >
                        {
                            this.props.isPlaying
                                ? <Pause fontSize="large" />
                                : <PlayArrow fontSize="large" />
                        }
                    </IconButton>

                    <IconButton color="primary" size="large">
                        <SkipNext fontSize="medium" />
                    </IconButton>

                    <IconButton color="primary" sx={{
                        display: { xs: 'none', md: 'inline-flex' } }}
                        onClick={this.props.toggleRepeat}
                    >
                        {RepeatButton(this.props.repeatType)}
                    </IconButton>
                </Grid>

                <Grid item xs={12} mx={4} sx={{ display: 'flex',
                    justifyContent: 'center', alignItems: 'center' }}
                >
                    <Slider size='small' defaultValue={30} min={0} max={100} />
                </Grid>

                <Grid item xs={12} mx={4} mt={-1} mb={0.5} sx={{ display: 'flex',
                    alignItems: 'flex-start', justifyContent: 'space-between' }}
                >
                    <Typography variant="subtitle2" color="text.secondary">0:00</Typography>
                    <Typography variant="subtitle2" color="text.secondary">0:00</Typography>
                </Grid>
            </Grid>
        </Grid>;
    }
}
