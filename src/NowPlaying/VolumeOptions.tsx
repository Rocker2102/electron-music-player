import React, { ReactNode } from 'react';

import Settings from '@mui/icons-material/SettingsOutlined';
import Equalizer from '@mui/icons-material/EqualizerRounded';
import VolumeOff from '@mui/icons-material/VolumeOffOutlined';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


export default class VolumeOptions extends React.PureComponent
    <unknown, unknown> {

    render(): ReactNode {
        return <Grid item xs={3} md={2} >
            <Grid container pr={2} >
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Stack direction="row" alignItems="center"
                        spacing={{ xs: 0 }} justifyContent='flex-end'
                    >
                        <Tooltip title="Mute">
                            <IconButton color="primary">
                                <VolumeOff />
                            </IconButton>
                        </Tooltip>

                        <Slider size='small' defaultValue={4} min={0} max={15} step={1}
                            valueLabelDisplay='auto'
                            sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
                        />

                        <Tooltip title="Open Settings">
                            <IconButton color="error">
                                <Settings />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Equalizer">
                            <IconButton color="error"
                                sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
                            >
                                <Equalizer />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>;
    }
}
