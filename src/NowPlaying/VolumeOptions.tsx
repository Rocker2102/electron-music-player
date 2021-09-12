import React, { ReactNode } from 'react';

import Equalizer from '@mui/icons-material/EqualizerRounded';
import Settings from '@mui/icons-material/SettingsOutlined';
import VolumeOff from '@mui/icons-material/VolumeOffOutlined';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';


export default class VolumeOptions extends React.PureComponent
    <unknown, unknown> {

    render(): ReactNode {
        return <Grid item xs={3} md={2} >
            <Grid container pr={2} >
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Stack direction="row" sx={{ mb: 1 }} alignItems="center"
                        spacing={{ xs: 0, md: 1 }} justifyContent='end'
                    >
                        <IconButton color="primary">
                            <VolumeOff />
                        </IconButton>
                        <Slider size='small' defaultValue={4} min={0} max={15} step={1}
                            valueLabelDisplay='auto'
                            sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
                        />
                        <IconButton color="error">
                            <Settings />
                        </IconButton>
                        <IconButton color="error">
                            <Equalizer />
                        </IconButton>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>;
    }
}
