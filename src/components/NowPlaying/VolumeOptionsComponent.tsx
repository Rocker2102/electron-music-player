import React, { ReactNode } from 'react';

import Settings from '@mui/icons-material/SettingsOutlined';
import Equalizer from '@mui/icons-material/EqualizerRounded';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import VolumeUp from '@mui/icons-material/VolumeUpOutlined';
import VolumeOff from '@mui/icons-material/VolumeOffOutlined';

import { VolumeOptionsProps, VolumeOptionsState } from '../../types/VolumeOptionsType';


export default class VolumeOptions extends React.PureComponent
    <VolumeOptionsProps, VolumeOptionsState> {

    state: VolumeOptionsState = {
        volume: this.props.volume
    };

    handleChange = (e: Event, value: number | number[]): void => {
        if (value instanceof Array) {
            value = value.length > 0 ? value[0] : 0;
        }

        this.setState({
            volume: value
        });

        this.props.handleVolumeUpdate(value);
    }

    render(): ReactNode {
        return <Grid item xs={3} lg={2} mr={2} ml="auto" >
            <Stack direction="row" alignItems="center"
                spacing={{ xs: 0, lg: 0.5 }} justifyContent='flex-end'
            >
                <IconButton color="primary" onClick={this.props.toggleMute}>
                    {this.props.isMute ? <VolumeOff /> : <VolumeUp />}
                </IconButton>

                <Slider size='small'
                    value={this.state.volume} min={0} max={15} step={1}
                    valueLabelDisplay='auto'
                    onChange={this.handleChange}
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
