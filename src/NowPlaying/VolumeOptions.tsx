import React, { ReactNode } from 'react';

import Settings from '@mui/icons-material/SettingsOutlined';
import Equalizer from '@mui/icons-material/EqualizerRounded';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import VolumeUp from '@mui/icons-material/VolumeUpOutlined';
import VolumeOff from '@mui/icons-material/VolumeOffOutlined';

import type { _NowPlaying } from '_App';


export default class VolumeOptions extends React.PureComponent
    <_NowPlaying.VolumeOptions.props, unknown> {

    constructor(props: _NowPlaying.VolumeOptions.props) {
        super(props);
    }

    renderVolumeBtn(): JSX.Element {
        let volumeBtn = <VolumeUp />;
        let tooltip = 'Click to mute';

        if (this.props.isMute) {
            volumeBtn = <VolumeOff />;
            tooltip = 'Click to unmute';
        }

        return <IconButton color="primary">
            {volumeBtn}
        </IconButton>;
    }

    render(): ReactNode {
        return <Grid item xs={3} md={2} pr={2} >
            <Stack direction="row" alignItems="center"
                spacing={{ xs: 0 }} justifyContent='flex-end'
            >
                {this.renderVolumeBtn()}

                <Slider size='small' defaultValue={4} min={0} max={15} step={1}
                    valueLabelDisplay='auto'
                    sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
                />

                <IconButton color="error">
                    <Settings />
                </IconButton>

                <IconButton color="error"
                    sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
                >
                    <Equalizer />
                </IconButton>
            </Stack>
        </Grid>;
    }
}