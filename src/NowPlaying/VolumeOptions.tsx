import React, { ReactNode } from 'react';

import Settings from '@mui/icons-material/SettingsOutlined';
import Equalizer from '@mui/icons-material/EqualizerRounded';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import VolumeUp from '@mui/icons-material/VolumeUpOutlined';
import VolumeOff from '@mui/icons-material/VolumeOffOutlined';


export default class VolumeOptions extends React.PureComponent
    <_NowPlaying.VolumeOptions.props, unknown> {

    constructor(props: _NowPlaying.VolumeOptions.props) {
        super(props);
    }

    render(): ReactNode {
        return <Grid item xs={3} lg={2} pr={2} ml="auto" >
            <Stack direction="row" alignItems="center"
                spacing={{ xs: 0, lg: 0.5 }} justifyContent='flex-end'
            >
                <IconButton color="primary" onClick={this.props.toggleMute}>
                    {this.props.isMute ? <VolumeOff /> : <VolumeUp />}
                </IconButton>

                <Slider size='small'
                    defaultValue={this.props.volume} min={0} max={15} step={1}
                    valueLabelDisplay='auto'
                    onChange={this.props.handleVolumeUpdate}
                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                />

                <IconButton color="error">
                    <Settings />
                </IconButton>

                <IconButton color="error"
                    sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                    <Equalizer />
                </IconButton>
            </Stack>
        </Grid>;
    }
}
