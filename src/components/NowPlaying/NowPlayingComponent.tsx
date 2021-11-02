import React, { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SongInfo from './SongInfoComponent';
import VolumeOptions from './VolumeOptionsComponent';
import PlaybackOptions from './PlaybackOptionsComponent';

import type { NowPlayingProps, NowPlayingState } from '../../types/NowPlayingType';


export default class NowPlaying extends React.PureComponent
    <NowPlayingProps, NowPlayingState> {

    private maxHeight = 120;
    protected baseContainerId = 'now-playing';

    state: NowPlayingState = {
        height: undefined
    };

    componentDidMount(): void {
        const e = document.getElementById(this.baseContainerId);

        this.setState({
            height: e?.clientHeight
        });
    }

    render(): ReactNode {
        return <Container className="NowPlaying" id={this.baseContainerId}
            sx={{ boxShadow: 5, position: 'fixed', bottom: 0, minWidth: '100%',
                zIndex: 1250 }}
            disableGutters={true} fixed={true} maxWidth={false}
        >
            <Grid container
                alignItems={'center'}
                sx={{ maxHeight: this.maxHeight, backdropFilter: 'blur(4px)',
                    background: this.props.background }}
            >
                <SongInfo {...this.props.songInfo} height={this.state.height} />

                <PlaybackOptions
                    {...this.props.playbackOptions}
                    isLoading={this.props.isLoading}
                />

                <VolumeOptions {...this.props.volumeOptions} />
            </Grid>
        </Container>;
    }
}
